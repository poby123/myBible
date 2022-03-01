const selectSection = $('.container-bible-select');
const contentSection = $('.container-bible-content');
const currentChapter = $('#current-chapter');
const backButton = $('#back-button');
const bcButton = $('#bc-button');
const adButton = $('#ad-button');

/* button event listeners */
$('.bible-book-button').click(e => {
  contentSection.toggleClass('hidden');
  backButton.toggleClass('hidden');

  renderContent(e.currentTarget.innerText);
});

backButton.click(()=>{
  backButton.toggleClass('hidden');
  contentSection.toggleClass('hidden');
  currentChapter.html('');
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
const renderContent = name => {
  const { no, chap } = bibles[name];

  contentSection.html(`
    <h2 id="current-chapter">${name}</h2>
    <button id="decoration"><i class="fas fa-ellipsis-h"></i></button>
  `);

  [...Array(chap).keys()].forEach(i => {
    // const id = `${host}/${no}/${no}_${i + 1}.mp3`;
    const id= `${no}_${i + 1}`;
    const node = $(`<button class="bible-chapter-button" id="${id}">${name} ${i + 1}장</button>`);
    contentSection.append(node);
  });

  $('.bible-chapter-button').click(e => {
    // console.log(e.currentTarget.id);
    onClickTrack(name, e.currentTarget.id);
    // console.log(no, name, e.currentTarget.id);
    
  });
};

/* utility functions */
const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setScreenSize();
window.addEventListener('resize', setScreenSize);
