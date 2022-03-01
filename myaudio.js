const audio = $('audio')[0];
audio.addEventListener('ended', (e)=>{
  console.log(e);
})

const onClickTrack = (name, chap) => {
    console.log(name, chap);
    const chapter = chap.split('_')[1];
    console.log(chapter);
    
    console.log(Object.values(bibles));
}