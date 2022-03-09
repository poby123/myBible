/* audio states */
let timer = 0;

const getBibleAudioSource = ({ bookNumber, chapterNumber }) => {
    return `${host}/${bookNumber}/${bookNumber}_${chapterNumber}.mp3`;
}

const onClickAudioTrack = (index) => {
    currentStatus.audioType = AUDIO_TYPE.NORMAL;
    currentStatus.name = audios[index].title;
    currentStatus.source = audios[index].source;
    currentStatus.index = index;

    fetchAndPlay(currentStatus);
}


const onClickBibleTrack = (name, chapter) => {
    currentStatus.audioType = AUDIO_TYPE.BIBLE;
    currentStatus.name = name;
    currentStatus.bookNumber = bibleInfos[name].no;
    currentStatus.chapterNumber = chapter;

    fetchAndPlay(currentStatus);
}


const onEndAudio = () => {
    if (currentStatus.audioType === AUDIO_TYPE.NORMAL) {
        pause();
        return;
    }
    currentStatus = getNextStatus(currentStatus);
    fetchAndPlay(currentStatus);
    renderContents(currentStatus.name, currentStatus.chapterNumber);

}


const onChangeDuration = () => {
    const sliderPosition = audio.duration * (audioSlider.val() / 100);
    audio.currentTime = sliderPosition;
}


const getBibleAudioTitle = ({ name, chapterNumber }) => {
    return `${name} ${chapterNumber}장`;
}


const resetSlider = () => {
    audioSlider.value = 0;
    audioSlider.val(0);
}


const updateDurationSlider = () => {
    let position = 0;

    if (!isNaN(audio.duration)) {
        position = audio.currentTime * (100 / audio.duration);
        audioSlider.val(position);
        currentTimeNode.html(parseSeconds(audio.currentTime));
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
    const { audioType, source, name } = currentStatus;

    let src = (audioType === AUDIO_TYPE.BIBLE) ? getBibleAudioSource(currentStatus) : source;
    const title = (audioType === AUDIO_TYPE.BIBLE) ? getBibleAudioTitle(currentStatus) : name;

    // proxy server due to ssl error
    if(location.protocol != 'http'){
        src = `${proxy}${src}`;
    }

    if (isPlayed) {
        pause();
        audio.currentTime = 0;
        clearInterval(timer);
        resetSlider();
    }
    currentAudioTitleNode.html(title);
    console.log('source: ', src);
    console.log('title: ', title);
    
    audio.src = src;
    audio.load();

    timer = setInterval(updateDurationSlider, 1000);
    play();
}

audioSlider.change(onChangeDuration);
audio.addEventListener('ended', onEndAudio);
