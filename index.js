const bookSelectSection = $('.container-bible-select');
const chapterSelectSection = $('.container-bible-chapter');
const contentSection = $('.container-bible-content');
const currentChapter = $('#current-chapter');
const backButton = $('#back-button');
const bcButton = $('#bc-button');
const adButton = $('#ad-button');

const audio = $('audio')[0];
const currentAudioTitleNode = $('#current-music-title');

/* states */
let isPlayed = false;
let currentStatus = {
    name: '창세기',
    bookNumber: 1,
    chapterNumber: 1
}
let stack = Array();

/* button event listeners */
$('.bible-book-button').click(e => {
  chapterSelectSection.toggleClass('hidden');

  if(stack.length == 0){
    backButton.toggleClass('hidden');
  }

  stack.push('chapter-select');
  renderChapters(e.currentTarget.innerText);
});

backButton.click(()=>{
  const it = stack.pop();

  if(stack.length == 0){
    backButton.toggleClass('hidden');
  }
  if(it == 'chapter-select'){
    chapterSelectSection.toggleClass('hidden');
    currentChapter.html('');
  }
  else if(it == 'bible-content'){
    contentSection.toggleClass('hidden');
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

/* callback functions */
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
}

const renderChapters = name => {
  const { no, chap } = bibles[name];

  chapterSelectSection.html(`
    <h2 id="current-chapter">${name}</h2>
    <button id="decoration"><i class="fas fa-ellipsis-h"></i></button>
  `);

  [...Array(chap).keys()].forEach(i => {
    const id= `${no}_${i + 1}`;
    const node = $(`<button class="bible-chapter-button" id="${id}">${name} ${i + 1}장</button>`);
    chapterSelectSection.append(node);
  });

  $('.bible-chapter-button').click(e => {
    stack.push('bible-content');
    contentSection.toggleClass('hidden');
    const chap = e.currentTarget.id;
    const chapter = chap.split('_')[1];
    
    renderContents(name, chapter);
    onClickBibleTrack(name, chapter);
  });
};

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
  const numberOfChater = bibles[name].chap;
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

setScreenSize();
window.addEventListener('resize', setScreenSize);
