# My Bible
## 목적
온라인으로 성경을 읽고, 들을 수 있는 것을 목적으로 합니다.

## 편집 방법
### 일반 오디오
[custom.js](custom.js)에서 `title`과 `source`를 적당히 수정해주시면 됩니다.

### 성경 오디오: [myaudio.js](myaudio.js)의 
```js
4 const getBibleAudioSource = ({ bookNumber, chapterNumber }) => {
5 // return `${host}/${bookNumber}/${bookNumber}_${chapterNumber}.mp3`; // 원래 소스
6 return `https://www.wordproaudio.net/bibles/app/audio/11/${bookNumber}/${chapterNumber}.mp3` // 임시소스
}
```
위 코드에서 5번째 줄 맨 앞의 // 을 제거하고, 6번째 줄 맨 앞에 //을 넣어주시면 됩니다.

## Todo
- 오디오 소스 변경
- 성능 테스트 및 최적화 방안

## Done
- 구약, 신약 이외의 기타버튼 1번, 2번, 3번
- 구약, 신약 버튼과 성경 내용의 글자크기는 '온라인 성경' 크기로
- 글자크기 버튼
- 배경은 흰색으로


## Reference
성경 파일 `k_bible_1950_dos_kr.js`은 https://github.com/ehrudxo/kbible1950의 소스를 사용했습니다.

## Bug Report
github의 issue를 이용하시거나 `i2pir@naver.com`등으로 오류내용을 알려주시면 조치하겠습니다.
