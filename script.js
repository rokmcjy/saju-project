if (!Kakao.isInitialized()) {
    Kakao.init('여기에_본인_JavaScript_키'); 
}
document.getElementById("unknownTime").addEventListener("change",function(){document.getElementById("birthTime").disabled=this.checked;});
document.getElementById("birthForm").addEventListener("submit",function(e){
e.preventDefault();
const birthDate = document.getElementById("birthDate").value,
birthTime = document.getElementById("birthTime").value,
unknownTime = document.getElementById("unknownTime").checked,
gender = document.getElementById("gender").value;
const date = new Date(birthDate),
year = date.getFullYear(),
month = date.getMonth()+1,
day = date.getDate();

const zodiac = ["원숭이","닭","개","돼지","쥐","소","호랑이","토끼","용","뱀","말","양"][year%12];
const elements = ["수","목","화","토","금"];
const element = elements[year%5];
const traits = {
  "수": "감성적이고 직관적",
  "목": "성장하고 확장하는 기운",
  "화": "열정적이고 추진력 강함",
  "토": "안정적이고 성실함",
  "금": "냉철하고 현실적"
};

const character = (element==="금"||element==="화")?"리더십, 적극적":"차분하고 신중한";
const loveStyle = (element==="금"||element==="화")?"직진형":"서서히 다가가는형";

let result = "<h2>매력살+사주 통합풀이</h2>";
result += "<p>생년월일: "+year+"년 "+month+"월 "+day+"일</p>";
result += "<p>출생시간: "+(unknownTime?"모름":birthTime)+"</p>";
result += "<p>성별: "+(gender==="male"?"남자":"여자")+"</p><br>";
result += "<h3>[기본 정보]</h3>";
result += "<p>- 띠: "+zodiac+"띠</p>";
result += "<p>- 오행성향: "+element+" ("+traits[element]+")</p>";
result += "<h3>[성격과 연애성향]</h3>";
result += "<p>- 성격: "+character+"</p>";
result += "<p>- 연애 스타일: "+loveStyle+"</p>";
result += "<h3>[대운 흐름]</h3>";
result += "<p>- 30대: 인간관계 확장 및 연애운 상승</p>";
result += "<p>- 40대: 재물 관리 주의 필요</p>";
result += "<p>- 50대: 귀인운 상승, 직업/커리어 강화</p>";

// 매력살 분석
let charms = [];
if (["호랑이","말","개"].includes(zodiac)) charms.push("도화살");
if (["돼지","토끼","양"].includes(zodiac)) charms.push("홍염살");
if (["쥐","용","원숭이"].includes(zodiac)) charms.push("천을귀인");
if (["닭","뱀","소"].includes(zodiac)) charms.push("문창살");
if (["용","말","쥐"].includes(zodiac)) charms.push("상관살");
if (["양","돼지","토끼"].includes(zodiac)) charms.push("화개살");
if (["소","토끼","양"].includes(zodiac)) charms.push("천덕귀인");

if (charms.length>0){
result += "<h3>[매력살 분석]</h3>";
charms.forEach(function(c){
switch(c){
case "도화살": result+='<p>1. 도화살: 타고난 외모 매력, 이성운 강함</p>'; break;
case "홍염살": result+='<p>2. 홍염살: 부드러운 감성, 연애 감각 탁월</p>'; break;
case "천을귀인": result+='<p>3. 천을귀인: 귀인운, 신뢰를 얻는 매력</p>'; break;
case "문창살": result+='<p>4. 문창살: 지적 매력, 언변력 뛰어남</p>'; break;
case "상관살": result+='<p>5. 상관살: 자유롭고 끼 넘치는 성격</p>'; break;
case "화개살": result+='<p>6. 화개살: 신비로운 감성, 예술적 아우라</p>'; break;
case "천덕귀인": result+='<p>7. 천덕귀인: 따뜻하고 인덕 많은 인간관계</p>'; break;
}
});
}

// 매력살 종합 해석
if (charms.length>1){
result += "<h3>[매력 조합 해석]</h3>";
result += "<p>- 다양한 매력살을 함께 지닌 인기형 사주입니다.</p>";
}

document.getElementById("result").innerHTML=result;
document.getElementById("share-buttons").style.display="flex";
});

// 결과 저장
document.getElementById("saveImageBtn").addEventListener("click",function(){
html2canvas(document.querySelector("#result")).then(e=>{
const t=document.createElement("a");
t.download="saju_result.png";
t.href=e.toDataURL();
t.click();
});
});

// 카카오톡 공유
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