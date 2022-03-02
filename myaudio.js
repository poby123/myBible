const audio = $('audio')[0];
const currentAudioTitleNode = $('#current-music-title');
const bibleArrays = Object.entries(bibles);

let isPlayed = false;
let currentStatus = {
    name: '창세기',
    bookNumber: 1,
    chapterNumber: 1
}

const onClickBibleTrack = (name, chap) => {
    const chapter = chap.split('_')[1];
    
    currentStatus.name = name;
    currentStatus.bookNumber = bibles[name].no;
    currentStatus.chapterNumber = chapter;
    
    fetchAndPlay(currentStatus);
}

const onEndAudio = () => {
    const {name, bookNumber, chapterNumber} = currentStatus;
    const numberOfChater = bibles[name].chap;
    
    const next = Number(chapterNumber) + 1;
    if(next <= numberOfChater){
        currentStatus.chapterNumber = next;
    }
    else{
        const next = bibleArrays[(bookNumber) % bibleArrays.length];
        currentStatus.name = next[0];
        currentStatus.bookNumber = next[1].no;
        currentStatus.chapterNumber = 1;
    }
    
    fetchAndPlay(currentStatus);
}

const getBibleAudioSource = ({bookNumber, chapterNumber}) => {
    return `${host}/${bookNumber}/${bookNumber}_${chapterNumber}.mp3`;
}

const getBibleAudioTitle = ({name, chapterNumber}) => {
    return `${name} ${chapterNumber}장`;
}

const fetchAndPlay = (currentStatus) => {
    const src = 'https://previews.cambridge-mt.com/LieToMe_Preview.mp3';//getBibleAudioSource(currentStatus);
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