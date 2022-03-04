const bookSelectSection = $('.container-bible-books'); // '창세기', '출애굽기' 등의 선택
const chapterSelectSection = $('.container-bible-chapter'); // n장 선택
const contentSection = $('.container-bible-content'); // 성경 구절이 나오는 부분
const currentChapter = $('#current-chapter'); 
const backButton = $('#back-button');
const bcButton = $('#bc-button'); // 구약 버튼
const adButton = $('#ad-button'); // 신약 버튼

const audio = $('audio')[0];
const currentAudioTitleNode = $('#current-music-title');
const windowType = {
  BIBLE_BOOK: 'BIBLE_BOOK', // defaults
  BIBLE_CHAPTER: 'BIBLE_CHAPTER',
  BIBLE_CONTENTS: 'BIBLE_CONTENTS'
}

/* states */
let isPlayed = false;
let currentStatus = {
    name: '창세기',
    bookNumber: 1,
    chapterNumber: 1
}
let stack = Array(); // windows stack



/* button event listeners */
$('.bible-book-button').click(e => {
  chapterSelectSection.toggleClass('hidden'); // show

  if(stack.length == 0){
    backButton.toggleClass('hidden'); // show
  }

  renderChapters(e.currentTarget.innerText);
});


backButton.click(()=>{
  const it = stack.pop();

  if(stack.length == 0){
    backButton.toggleClass('hidden'); // hide back button
  }
  if(it == windowType.BIBLE_CHAPTER){
    chapterSelectSection.toggleClass('hidden'); // hide chapter section
    currentChapter.html('');
  }
  else if(it == windowType.BIBLE_CONTENTS){
    contentSection.toggleClass('hidden'); // hide content section
    contentSection.html('');
  }
})


bcButton.click(()=>{
  $('.bc').toggleClass('no-display'); 
  bcButton.toggleClass('no-background');
})


adButton.click(()=>{
  $('.ad').toggleClass('no-display'); 
  adButton.toggleClass('no-background');
})



/* windows render functions */
const renderChapters = name => {
  stack.push(windowType.BIBLE_CHAPTER);
  const { no, numberOfChapters } = bibles[name];

  chapterSelectSection.html(`
    <h2 id="current-chapter">${name}</h2>
    <button id="decoration"><i class="fas fa-ellipsis-h"></i></button>
  `);

  [...Array(numberOfChapters).keys()].forEach(i => {
    const id= `${no}_${i + 1}`;
    const node = $(`<button class="bible-chapter-button" id="${id}">${name} ${i + 1}장</button>`);
    chapterSelectSection.append(node);
  });

  // register event listener to chapter buttons
  $('.bible-chapter-button').click(e => {
    stack.push(windowType.BIBLE_CONTENTS);

    contentSection.toggleClass('hidden'); // show
    const chapter = e.currentTarget.id.split('_')[1];
    
    renderContents(name, chapter); // for render contents
    onClickBibleTrack(name, chapter); // for audio
  });
};


const renderContents = (name, chapter) => {
  const keyword = bibles[name].keyword;
  const content = bible[keyword][chapter];

  contentSection.html(`
    <h2 id="current-chapter">${name} ${chapter}장</h2>
  `);
  for(const i of Object.entries(content)){
    const node = $(`<span class='sentence'>${i[0]} ${i[1].t}</span>`);
    contentSection.append(node);
  }

  contentSection.scrollTop = 0;
}


/* utility functions */
const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}


const getPreviousStatus = (currentStatus) => {
  const {bookNumber, chapterNumber} = currentStatus;
  let newStatus = currentStatus;

  const nextChapter = Number(chapterNumber) - 1;
  if(nextChapter > 0){
      newStatus.chapterNumber = nextChapter;
  }
  else {
    const nextBookNumber = (bookNumber - 1) <= 0 ? bibleArrays.length : (bookNumber - 1);
    const next = bibleArrays[nextBookNumber - 1];
    newStatus.name = next[0];
    newStatus.bookNumber = next[1].no;
    newStatus.chapterNumber = 1;
  }

  return newStatus;
}


const getNextStatus = (currentStatus) => {
  const {name, bookNumber, chapterNumber} = currentStatus;
  const numberOfChater = bibles[name].numberOfChapters;
  let newStatus = currentStatus;
  
  const nextChapter = Number(chapterNumber) + 1;
  if(nextChapter <= numberOfChater){
      newStatus.chapterNumber = nextChapter;
  }
  else{
      const next = bibleArrays[(bookNumber) % bibleArrays.length];
      newStatus.name = next[0];
      newStatus.bookNumber = next[1].no;
      newStatus.chapterNumber = 1;
  }

  return newStatus;
}


/* on window loaded */
setScreenSize();
window.addEventListener('resize', setScreenSize);
