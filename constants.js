const proxy = 'https://wj-http-proxy.herokuapp.com/?url=';
const host = 'http://210.217.24.54:88/mp3_bible/korean';
const bibleInfos = {
  창세기: { no: 1, numberOfChapters: 50, keyword: "창"},
  출애굽기: { no: 2, numberOfChapters: 40, keyword: "출"},
  레위기: { no: 3, numberOfChapters: 27, keyword: "레"},
  민수기: { no: 4, numberOfChapters: 36, keyword: "민"},
  신명기: { no: 5, numberOfChapters: 34, keyword: "신"},
  여호수아: { no: 6, numberOfChapters: 24, keyword: "수"},
  사사기: { no: 7, numberOfChapters: 21, keyword: "삿"},
  룻기: { no: 8, numberOfChapters: 4, keyword: "룻"},
  사무엘상: { no: 9, numberOfChapters: 31, keyword: "삼상"},
  사무엘하: { no: 10, numberOfChapters: 24, keyword: "삼하"},
  열왕기상: { no: 11, numberOfChapters: 22, keyword: "왕상"},
  열왕기하: { no: 12, numberOfChapters: 25, keyword: "왕하"},
  역대상: { no: 13, numberOfChapters: 29, keyword: "대상"},
  역대하: { no: 14, numberOfChapters: 36, keyword: "대하"},
  에스라: { no: 15, numberOfChapters: 10, keyword: "스"},
  느헤미야: { no: 16, numberOfChapters: 13, keyword: "느"},
  에스더: { no: 17, numberOfChapters: 10, keyword: "에"},
  욥기: { no: 18, numberOfChapters: 42, keyword: "욥"},
  시편: { no: 19, numberOfChapters: 150, keyword: "시"},
  잠언: { no: 20, numberOfChapters: 31, keyword: "잠"},
  전도서: { no: 21, numberOfChapters: 12, keyword: "전"},
  아가: { no: 22, numberOfChapters: 8, keyword: "아"},
  이사야: { no: 23, numberOfChapters: 66, keyword: "사"},
  예레미야: { no: 24, numberOfChapters: 52, keyword: "렘"},
  '예레미야 애가': { no: 25, numberOfChapters: 5, keyword: "애"},
  에스겔: { no: 26, numberOfChapters: 48, keyword: "겔"},
  다니엘: { no: 27, numberOfChapters: 12, keyword: "단"},
  호세아: { no: 28, numberOfChapters: 14, keyword: "호"},
  요엘: { no: 29, numberOfChapters: 3, keyword: "욜"},
  아모스: { no: 30, numberOfChapters: 9, keyword: "암"},
  오바댜: { no: 31, numberOfChapters: 1, keyword: "옵"},
  요나: { no: 32, numberOfChapters: 4, keyword: "욘"},
  미가: { no: 33, numberOfChapters: 7, keyword: "미"},
  나훔: { no: 34, numberOfChapters: 3, keyword: "나"},
  하박국: { no: 35, numberOfChapters: 3, keyword: "합"},
  스바냐: { no: 36, numberOfChapters: 3, keyword: "습"},
  학개: { no: 37, numberOfChapters: 2, keyword: "학"},
  스가랴: { no: 38, numberOfChapters: 14, keyword: "슥"},
  말라기: { no: 39, numberOfChapters: 4, keyword: "말"},
  마태복음: { no: 40, numberOfChapters: 28, keyword: "마"},
  마가복음: { no: 41, numberOfChapters: 16, keyword: "막"},
  누가복음: { no: 42, numberOfChapters: 24, keyword: "눅"},
  요한복음: { no: 43, numberOfChapters: 21, keyword: "요"},
  사도행전: { no: 44, numberOfChapters: 28, keyword: "행"},
  로마서: { no: 45, numberOfChapters: 16, keyword: "롬"},
  고린도전서: { no: 46, numberOfChapters: 16, keyword: "고전"},
  고린도후서: { no: 47, numberOfChapters: 13, keyword: "고후"},
  갈라디아서: { no: 48, numberOfChapters: 6, keyword: "갈"},
  에베소서: { no: 49, numberOfChapters: 6, keyword: "엡"},
  빌립보서: { no: 50, numberOfChapters: 4, keyword: "빌"},
  골로새서: { no: 51, numberOfChapters: 4, keyword: "골"},
  데살로니가전서: { no: 52, numberOfChapters: 5, keyword: "살전"},
  데살로니가후서: { no: 53, numberOfChapters: 3, keyword: "살후"},
  디모데전서: { no: 54, numberOfChapters: 6, keyword: "딤전"},
  디모데후서: { no: 55, numberOfChapters: 4, keyword: "딤후"},
  디도서: { no: 56, numberOfChapters: 3, keyword: "딛"},
  빌레몬서: { no: 57, numberOfChapters: 1, keyword: "몬"},
  히브리서: { no: 58, numberOfChapters: 13, keyword: "히"},
  야고보서: { no: 59, numberOfChapters: 5, keyword: "약"},
  베드로전서: { no: 60, numberOfChapters: 5, keyword: "벧전"},
  베드로후서: { no: 61, numberOfChapters: 3, keyword: "벧후"},
  요한1서: { no: 62, numberOfChapters: 5, keyword: "요일"},
  요한2서: { no: 63, numberOfChapters: 1, keyword: "요이"},
  요한3서: { no: 64, numberOfChapters: 1, keyword: "요삼"},
  유다서: { no: 65, numberOfChapters: 1, keyword: "유"},
  요한계시록: { no: 66, numberOfChapters: 22, keyword: "계"},
};
const bibleArrays = Object.entries(bibleInfos);
