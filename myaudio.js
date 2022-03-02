const onClickBibleTrack = (name, chapter) => {
    currentStatus.name = name;
    currentStatus.bookNumber = bibles[name].no;
    currentStatus.chapterNumber = chapter;
    
    fetchAndPlay(currentStatus);
}

const onEndAudio = () => {
    currentStatus = getNextStatus(currentStatus);
    fetchAndPlay(currentStatus);
    renderContents(currentStatus.name, currentStatus.chapterNumber);
}

const getBibleAudioSource = ({bookNumber, chapterNumber}) => {
    // return `${host}/${bookNumber}/${bookNumber}_${chapterNumber}.mp3`;
    return `https://www.wordproaudio.net/bibles/app/audio/11/${bookNumber}/${chapterNumber}.mp3`
}

const getBibleAudioTitle = ({name, chapterNumber}) => {
    return `${name} ${chapterNumber}장`;
}

const fetchAndPlay = (currentStatus) => {
    const src = getBibleAudioSource(currentStatus);
    const title = getBibleAudioTitle(currentStatus);

    if(isPlayed){
        audio.pause();
        audio.currentTime = 0;
        isPlayed = false;
    }
    currentAudioTitleNode.html(title);
    console.log('source: ', src);
    // src = 
    audio.src = src;
    audio.load();
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          isPlayed = true;
        })
        .catch((e) => {
          console.log(e);
          currentAudioTitleNode.text(`${title} 재생 중 ${e} 오류가 발생했습니다.`);
        });
    }
}

audio.addEventListener('ended', onEndAudio);