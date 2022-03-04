/* audio states */
let timer = 0;


const onClickBibleTrack = (name, chapter) => {
    currentStatus.name = name;
    currentStatus.bookNumber = bibleInfos[name].no;
    currentStatus.chapterNumber = chapter;

    fetchAndPlay(currentStatus);
}


const onEndAudio = () => {
    currentStatus = getNextStatus(currentStatus);
    fetchAndPlay(currentStatus);
    renderContents(currentStatus.name, currentStatus.chapterNumber);
}


const onChangeDuration = () => {
    const sliderPosition = audio.duration * (audioSlider.val() / 100);
    console.log('on change duration: ', sliderPosition);
    audio.currentTime = sliderPosition;
}


const getBibleAudioSource = ({ bookNumber, chapterNumber }) => {
    // return `${host}/${bookNumber}/${bookNumber}_${chapterNumber}.mp3`;
    return `https://www.wordproaudio.net/bibles/app/audio/11/${bookNumber}/${chapterNumber}.mp3`
}


const getBibleAudioTitle = ({ name, chapterNumber }) => {
    return `${name} ${chapterNumber}장`;
}


const resetSlider = () => {
    // audioSlider.value = 0;
    audioSlider.val(0);
}


const updateDurationSlider = () => {
    let position = 0;

    if (!isNaN(audio.duration)) {
        position = audio.currentTime * (100 / audio.duration);
        audioSlider.val(position);
        currentTimeNode.html(parseSeconds(audioSlider.val()))
    }
}

const pause = () => {
    audio.pause();
    isPlayed = false;
    playButton.html(`<i class="fa-solid fa-play"></i>`);
}


const play = () => {
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise
            .then((_) => {
                playButton.html(`<i class="fa-solid fa-pause"></i>`)
                endTimeNode.html(parseSeconds(audio.duration));
                isPlayed = true;
            })
            .catch((e) => {
                console.log(e);
                currentAudioTitleNode.text(`재생 중 ${e} 오류가 발생했습니다.`);
            });
    }
}


const fetchAndPlay = (currentStatus) => {
    const src = getBibleAudioSource(currentStatus);
    const title = getBibleAudioTitle(currentStatus);

    if (isPlayed) {
        pause();
        audio.currentTime = 0;
        clearInterval(timer);
        resetSlider();
    }
    currentAudioTitleNode.html(title);
    console.log('source: ', src);
    audio.src = src;
    audio.load();

    timer = setInterval(updateDurationSlider, 1000);
    play();
}

audioSlider.change(onChangeDuration);
audio.addEventListener('ended', onEndAudio);