const bookSelectSection = $('.container-bible-select');
const chapterSelectSection = $('.container-bible-chapter');
const contentSection = $('.container-bible-content');
const currentChapter = $('#current-chapter');
const backButton = $('#back-button');
const bcButton = $('#bc-button');
const adButton = $('#ad-button');
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
const renderContents = (name, chap) => {
  const keyword = bibles[name].keyword;
  const chapter = chap.split('_')[1];
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
    renderContents(name, e.currentTarget.id);
    // onClickBibleTrack(name, e.currentTarget.id);
  });
};

/* utility functions */
const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setScreenSize();
window.addEventListener('resize', setScreenSize);
