const host = 'http://210.217.24.54:88/mp3_bible/korean';
const bibles = {
  창세기: { no: 1, chap: 50 },
  출애굽기: { no: 2, chap: 40 },
  레위기: { no: 3, chap: 27 },
  민수기: { no: 4, chap: 36 },
  신명기: { no: 5, chap: 34 },
  여호수아: { no: 6, chap: 24 },
  사사기: { no: 7, chap: 21 },
  룻기: { no: 8, chap: 4 },
  사무엘상: { no: 9, chap: 31 },
  사무엘하: { no: 10, chap: 24 },
  열왕기상: { no: 11, chap: 22 },
  열왕기하: { no: 12, chap: 25 },
  역대상: { no: 13, chap: 29 },
  역대하: { no: 14, chap: 36 },
  에스라: { no: 15, chap: 10 },
  느헤미야: { no: 16, chap: 13 },
  에스더: { no: 17, chap: 10 },
  욥기: { no: 18, chap: 17 },
  시편: { no: 19, chap: 18 },
  잠언: { no: 20, chap: 19 },
  전도서: { no: 21, chap: 12 },
  아가: { no: 22, chap: 8 },
  이사야: { no: 23, chap: 66 },
  예레미야: { no: 24, chap: 52 },
  '예레미야 애가': { no: 25, chap: 5 },
  에스겔: { no: 26, chap: 48 },
  다니엘: { no: 27, chap: 12 },
  호세아: { no: 28, chap: 14 },
  요엘: { no: 29, chap: 3 },
  아모스: { no: 30, chap: 9 },
  오바댜: { no: 31, chap: 1 },
  요나: { no: 32, chap: 4 },
  미가: { no: 33, chap: 7 },
  나훔: { no: 34, chap: 3 },
  하박국: { no: 35, chap: 3 },
  스바냐: { no: 36, chap: 3 },
  학개: { no: 37, chap: 2 },
  스가랴: { no: 38, chap: 14 },
  말라기: { no: 39, chap: 4 },
  마태복음: { no: 40, chap: 28 },
  마가복음: { no: 41, chap: 16 },
  누가복음: { no: 42, chap: 24 },
  요한복음: { no: 43, chap: 21 },
  사도행전: { no: 44, chap: 28 },
  로마서: { no: 45, chap: 16 },
  고린도전서: { no: 46, chap: 16 },
  고린도후서: { no: 47, chap: 13 },
  갈라디아서: { no: 48, chap: 6 },
  에베소서: { no: 49, chap: 6 },
  빌립보서: { no: 50, chap: 4 },
  골로새서: { no: 51, chap: 4 },
  데살로니가전서: { no: 52, chap: 5 },
  데살로니가후서: { no: 53, chap: 3 },
  디모데전서: { no: 54, chap: 6 },
  디모데후서: { no: 55, chap: 4 },
  디도서: { no: 56, chap: 3 },
  빌레몬서: { no: 57, chap: 1 },
  히브리서: { no: 58, chap: 13 },
  야고보서: { no: 59, chap: 5 },
  베드로전서: { no: 60, chap: 5 },
  베드로후서: { no: 61, chap: 3 },
  요한1서: { no: 62, chap: 5 },
  요한2서: { no: 63, chap: 1 },
  요한3서: { no: 64, chap: 1 },
  유다서: { no: 65, chap: 1 },
  요한계시록: { no: 66, chap: 22 },
};
const selectSection = $('.container-bible-select');
const contentSection = $('.container-bible-content');
const currentChapter = $('#current-chapter');
const bibleBookButton = $('.bible-book-button');
const bibleChapterButton = $('.bible-chapter-button');
const backButton = $('#back-button');

bibleBookButton.click(e => {
  contentSection.toggleClass('hidden');
  backButton.toggleClass('hidden');

  renderContent(e.currentTarget.innerText);
});


backButton.click(()=>{
  backButton.toggleClass('hidden');
  contentSection.toggleClass('hidden');
  currentChapter.html('');
})


const renderContent = name => {
  const { no, chap } = bibles[name];

  contentSection.html(`
    <h2 id="current-chapter">${name}</h2>
    <button id="decoration"><i class="fas fa-ellipsis-h"></i></button>
  `);

  [...Array(chap).keys()].forEach(i => {
    const id = `${host}/${no}/${no}_${i + 1}.mp3`;
    const node = $(`<button class="bible-chapter-button" id="${id}">${name} ${i + 1}장</button>`);
    contentSection.append(node);
  });

  bibleChapterButton.click(e => {
    console.log(e.currentTarget.id);
  });
};

const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setScreenSize();

