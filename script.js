// 카카오 init (본인 JavaScript 키 입력 필요)
if (!Kakao.isInitialized()) {
    Kakao.init('여기에_본인_JavaScript_키');
}

// 출생시간 모름 체크
document.getElementById("unknownTime").addEventListener("change",function(){document.getElementById("birthTime").disabled=this.checked;});

// 사주풀이
document.getElementById("birthForm").addEventListener("submit",function(e){
e.preventDefault();
const birthDate = document.getElementById("birthDate").value,
birthTime = document.getElementById("birthTime").value,
unknownTime = document.getElementById("unknownTime").checked,
gender = document.getElementById("gender").value;
const date = new Date(birthDate),
year = date.getFullYear(),
zodiac = ["원숭이","닭","개","돼지","쥐","소","호랑이","토끼","용","뱀","말","양"][year%12];
let result = "생년월일: "+birthDate.replaceAll("-","년 ").replace(" ","월 ")+"일<br>";
result += "출생시간: "+(unknownTime?"모름":birthTime)+"<br>";
result += "성별: "+("male"===gender?"남자":"여자")+"<br><br>";

// 매력살 판별
let charms = [];
if (["호랑이","말","개"].includes(zodiac)) charms.push("도화살");
if (["돼지","토끼","양"].includes(zodiac)) charms.push("홍염살");
if (["쥐","용","원숭이"].includes(zodiac)) charms.push("천을귀인");
if (["닭","뱀","소"].includes(zodiac)) charms.push("문창살");
if (["용","말","쥐"].includes(zodiac)) charms.push("상관살");
if (["양","돼지","토끼"].includes(zodiac)) charms.push("화개살");
if (["소","토끼","양"].includes(zodiac)) charms.push("천덕귀인");

result += "<strong>[매력살 분석]</strong><br>";
charms.forEach(function(c){
  switch(c){
    case "도화살": result+="- 도화살: 타고난 외모 매력, 이성운 강함<br>"; break;
    case "홍염살": result+="- 홍염살: 부드러운 감성 매력<br>"; break;
    case "천을귀인": result+="- 천을귀인: 신뢰와 도움을 주는 매력<br>"; break;
    case "문창살": result+="- 문창살: 지적이고 말솜씨 좋은 매력<br>"; break;
    case "상관살": result+="- 상관살: 자유롭고 끼 넘치는 성격<br>"; break;
    case "화개살": result+="- 화개살: 신비로운 감성 아우라<br>"; break;
    case "천덕귀인": result+="- 천덕귀인: 따뜻하고 인덕 많은 매력<br>"; break;
  }
});
if (charms.length > 1){
  result += "<br><strong>[매력 조합 해석]</strong><br>";
  result += "- 다양한 매력살을 함께 가진 인기형 사주입니다.<br>";
}
document.getElementById("result").innerHTML=result;
document.getElementById("share-buttons").style.display="flex";
});

// 저장 버튼
document.getElementById("saveImageBtn").addEventListener("click",function(){
html2canvas(document.querySelector("#result")).then(e=>{
const t=document.createElement("a");
t.download="saju_result.png";
t.href=e.toDataURL();
t.click();
});
});

// 카카오 공유
document.getElementById("kakaoShareBtn").addEventListener("click",function(){
Kakao.Link.sendDefault({
  objectType: 'text',
  text: '나의 매력살 사주풀이 결과를 공유합니다!',
  link: {
    mobileWebUrl: window.location.href,
    webUrl: window.location.href
  }
});
});

// 문자 공유
document.getElementById("smsShareBtn").addEventListener("click",function(){
const e=window.location.href;
window.location.href="sms:?body="+encodeURIComponent(e);
});