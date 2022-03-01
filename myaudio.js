const audio = $('audio')[0];
const currentAudioTitleNode = $('#current-music-title');
const bibleArrays = Object.entries(bibles);

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
    
    if(chapterNumber + 1 <= numberOfChater){
        currentStatus.chapterNumber = chapterNumber + 1;
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
    const src = getBibleAudioSource(currentStatus);
    const title = getBibleAudioTitle(currentStatus);

    audio.pause();
    audio.currentTime = 0;
    currentAudioTitleNode.html(title);
    console.log('fetch ', src);
    
    fetch(src).then(res => res.blob())
    .then(blob => {
        audio.src = blob;
        return audio.play();
    })
    .then(_ => {
        
    })
    .catch(e => {
        console.log('error : ', e);
        currentAudioTitleNode.text(`${title} 재생 중 오류가 발생했습니다.`);
    })
}

audio.addEventListener('ended', onEndAudio);