/* on window loaded */
setScreenSize();
window.addEventListener('resize', setScreenSize);
window.addEventListener('beforeunload', () => {
  audio.pause();
  audio.currentTime = 0;
  audio.remove();
})


/* sync url params */
const bookParamValue = getParam('book');
const chapterParamValue = getParam('chapter');
const audioSourceParamValue = getParam('audio');


// reset history for back button
window.history.replaceState('', '', window.location.href.split('?')[0]);

if(bookParamValue){
  onClickBookButton(bookParamValue);

  if(chapterParamValue){
    onClickChapterButton(bookParamValue, chapterParamValue);
  }
}
else if(audioSourceParamValue){
  onClickAudioTrack(audioSourceParamValue);
}