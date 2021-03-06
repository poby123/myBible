const bookSelectSection = $('.container-bible-books'); // '창세기', '출애굽기' 등의 선택
const chapterSelectSection = $('.container-bible-chapter'); // n장 선택
const contentSection = $('.container-bible-content'); // 성경 구절이 나오는 부분
const currentChapter = $('#current-chapter');
const backButton = $('#back-button');

const audio = document.createElement('audio');
const audioSlider = $('#duration-slider');
const playButton = $('#play');
const currentTimeNode = $('#current-time');
const endTimeNode = $('#end-time');

const currentAudioTitleNode = $('#current-music-title');
const windowType = {
  BIBLE_BOOK: 'WINDOW_TYPE/BIBLE_BOOK', // defaults
  BIBLE_CHAPTER: 'WINDOW_TYPE/BIBLE_CHAPTER',
  BIBLE_CONTENTS: 'WINDOW_TYPE/BIBLE_CONTENTS'
};

const AUDIO_TYPE = {
  BIBLE: 'AUDIO_TYPE/BIBLE_AUDIO',
  NORMAL: 'AUDIO_TYPE/NORMAL_AUDIO'
}

/* render audios */
audios.forEach(({ title }, i) => {
  const node = $(`<button class="audio-book-button etc" id="${i}">${title}</button>`)
  bookSelectSection.append(node);
});


/* states */
let isPlayed = false;
let activatedCategory = null;
let currentStatus = {
  name: '창세기',
  bookNumber: 1,
  chapterNumber: 1,

  audioType: AUDIO_TYPE.BIBLE,
  source: null,
  index: 0
}

let verseFontSize = Number(window.localStorage.getItem('fontSize')) || 32;
let stack = Array(windowType.BIBLE_BOOK); // windows stack


/* button event listeners */
$('#main-title').click(() => {
  location.replace(window.location.href.split('?')[0]);
})


$('.bible-book-button').click(e => {
  onClickBookButton(e.currentTarget.innerText);
});

const onClickBookButton = (book => {
  chapterSelectSection.toggleClass('hidden'); // show
  backButton.toggleClass('hidden'); // show

  stack.push(windowType.BIBLE_CHAPTER);
  renderChapters(book);
})

$('.audio-book-button').click(e => {
  const source = decodeURI(e.currentTarget.id);
  onClickAudioTrack(source);
});



backButton.click(() => {
  onBack();
});

const onBack = () => {
  if (stack.length == 1) {
    return;
  }

  const it = stack.pop();

  if (it == windowType.BIBLE_CHAPTER) {
    backButton.toggleClass('hidden'); // hide back button
    chapterSelectSection.toggleClass('hidden'); // hide chapter section
  }
  else if (it == windowType.BIBLE_CONTENTS) {
    contentSection.toggleClass('hidden'); // hide content section
    $('#font-control').css('display', 'none');  // hide font control
    $('#category-control').css('display', 'flex'); // show categories
  }
}



$('.category-button').click(e => {
  const selected = e.currentTarget.id;

  // 이미 선택된 카테고리가 있는 경우
  if (activatedCategory) {

    // 선택된 카테고리가 다시 눌린 경우
    if (activatedCategory === selected) {
      showCategory(selected);
      activatedCategory = null;
    }

    // 다른 카테고리가 눌린 경우
    else {
      showCategory(activatedCategory);
      showCategory(selected);
      activatedCategory = selected;
    }
  }

  // 선택된 카테고리가 없는 경우.
  else {
   showCategory(selected);
   activatedCategory = selected;
  }
})


const showCategory = (selected) => {
  const categoryButtons = { 'bc-button': 'bc', 'ad-button': 'ad', 'etc-button': 'etc' };

  $(`#${selected}`).toggleClass('no-background');

  for (const i of Object.entries(categoryButtons)) {
    if (i[0] == selected) {
      continue;
    }
    $(`.${i[1]}`).toggleClass('no-display');
  }
}


$('#font-minus').click(() => {
  verseFontSize -= 2;
  window.localStorage.setItem('fontSize', verseFontSize);
  $('.container-bible-content .verse').css('font-size', `${verseFontSize}px`);
})


$('#font-plus').click(() => {
  verseFontSize += 2;
  window.localStorage.setItem('fontSize', verseFontSize);
  $('.container-bible-content .verse').css('font-size', `${verseFontSize}px`);
})



/* audio buttons event listener */
playButton.on('click', () => {
  if (isPlayed) {
    pause();
  }
  else {
    play();
  }
});


$('#backward').on('click', () => {
  currentStatus = getPreviousStatus(currentStatus);
  if (currentStatus.audioType === AUDIO_TYPE.NORMAL) {
    onClickAudioTrack(currentStatus.index);
    return;
  }

  updateWindowInAudioControl();

  const { name, chapterNumber } = currentStatus;
  renderContents(name, chapterNumber);
  onClickBibleTrack(name, chapterNumber);
})



$('#forward').on('click', () => {
  currentStatus = getNextStatus(currentStatus);

  if (currentStatus.audioType === AUDIO_TYPE.NORMAL) {
    onClickAudioTrack(currentStatus.index);
    return;
  }

  updateWindowInAudioControl();

  const { name, chapterNumber } = currentStatus;
  renderContents(name, chapterNumber);
  onClickBibleTrack(name, chapterNumber);
})



/*************************** */
/* windows render functions */
/*************************** */

const renderChapters = name => {
  const { no, numberOfChapters } = bibleInfos[name];

  chapterSelectSection.html(`
    <h2 id="current-chapter">${name}</h2>
    <button id="decoration"><i class="fas fa-ellipsis-h"></i></button>
  `);

  [...Array(numberOfChapters).keys()].forEach(i => {
    const id = `${no}_${i + 1}`;
    const node = $(`<button class="bible-chapter-button" id="${id}">${name} ${i + 1}장</button>`);
    chapterSelectSection.append(node);
  });


  // register event listener to chapter buttons
  $('.bible-chapter-button').click(e => {
    const chapter = e.currentTarget.id.split('_')[1];
    onClickChapterButton(name, chapter);
  });

  chapterSelectSection.scrollTop(0);
};

const onClickChapterButton = (name, chapter) => {
  stack.push(windowType.BIBLE_CONTENTS);
  contentSection.toggleClass('hidden'); // show

  renderContents(name, chapter); // for render contents
  onClickBibleTrack(name, chapter); // for audio
}



const renderContents = (name, chapter) => {
  const keyword = bibleInfos[name].keyword;
  const content = bible[keyword][chapter];


  $('#font-control').css('display', 'flex');
  $('#category-control').css('display', 'none');

  contentSection.html(`
    <h2 id="current-chapter">${name} ${chapter}장</h2>
  `);
  for (const i of Object.entries(content)) {
    let verseClass = i[0] % 2 == 0 ? 'accent' : 'normal';
    const node = $(`<div class='verse-container ${verseClass}'>${i[0]}<span class='verse' style='font-size: ${verseFontSize}px;'> ${i[1].t}</span></div>`);
    contentSection.append(node);
  }

  contentSection.scrollTop(0);
}




/* utility functions */
const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}


const updateWindowInAudioControl = () => {
  const top = stack[stack.length - 1];
  if (top == windowType.BIBLE_CHAPTER) {
    stack.push(windowType.BIBLE_CONTENTS);
    contentSection.toggleClass('hidden'); // show
  }
  else if (top == windowType.BIBLE_BOOK) {
    stack.push(windowType.BIBLE_CONTENTS);
    backButton.toggleClass('hidden'); // show
    contentSection.toggleClass('hidden'); // show
  }
}


const getPreviousStatus = (currentStatus) => {
  const { bookNumber, chapterNumber, audioType } = currentStatus;
  let newStatus = currentStatus;

  // in case normal audio
  if (audioType === AUDIO_TYPE.NORMAL) {
    let index = currentStatus.index;

    if (--index < 0) {
      index = audios.length - 1;
    }

    newStatus = { ...currentStatus, index: index };
    return newStatus;
  }

  const nextChapter = Number(chapterNumber) - 1;
  if (nextChapter > 0) {
    newStatus.chapterNumber = nextChapter;
  }
  else {
    const nextBookNumber = (bookNumber - 1) <= 0 ? bibleArrays.length : (bookNumber - 1);
    const next = bibleArrays[nextBookNumber - 1];
    newStatus.name = next[0];
    newStatus.bookNumber = next[1].no;
    newStatus.chapterNumber = next[1].numberOfChapters;
  }

  return newStatus;
}


const getNextStatus = (currentStatus) => {
  const { name, bookNumber, chapterNumber, audioType } = currentStatus;
  let newStatus = currentStatus;

  // in case normal audio
  if (audioType === AUDIO_TYPE.NORMAL) {
    let index = currentStatus.index;
    newStatus = { ...currentStatus, index: (index + 1) % audios.length };
    return newStatus;
  }

  // in case bible audio
  const numberOfChater = bibleInfos[name].numberOfChapters;
  const nextChapter = Number(chapterNumber) + 1;

  if (nextChapter <= numberOfChater) {
    newStatus.chapterNumber = nextChapter;
  }
  else {
    const next = bibleArrays[(bookNumber) % bibleArrays.length];
    newStatus.name = next[0];
    newStatus.bookNumber = next[1].no;
    newStatus.chapterNumber = 1;
  }

  return newStatus;
}


const getParam = (sname) => {
  let params = decodeURI(window.location.search).substr(location.search.indexOf("?") + 1);
  let sval = "";
  params = params.split("&");

  for (let i = 0; i < params.length; i++) {
    let temp = params[i].split("=");
    if ([temp[0]] == sname) { sval = temp[1]; }
  }

  return sval;
}


const parseSeconds = (sec) => {
  const date = new Date(0);
  date.setSeconds(sec);
  return date.toISOString().substr(14, 5);
}