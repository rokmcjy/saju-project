// 카카오 초기화 (본인 JavaScript 키 입력 필요)
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
let result = "<h2>매력살 사주풀이 결과</h2>";
result += "<p>생년월일: "+birthDate.replaceAll("-","년 ").replace(" ","월 ")+"일</p>";
result += "<p>출생시간: "+(unknownTime?"모름":birthTime)+"</p>";
result += "<p>성별: "+("male"===gender?"남자":"여자")+"</p><br>";

// 매력살 판별
let charms = [];
if (["호랑이","말","개"].includes(zodiac)) charms.push("도화살");
if (["돼지","토끼","양"].includes(zodiac)) charms.push("홍염살");
if (["쥐","용","원숭이"].includes(zodiac)) charms.push("천을귀인");
if (["닭","뱀","소"].includes(zodiac)) charms.push("문창살");
if (["용","말","쥐"].includes(zodiac)) charms.push("상관살");
if (["양","돼지","토끼"].includes(zodiac)) charms.push("화개살");
if (["소","토끼","양"].includes(zodiac)) charms.push("천덕귀인");

if (charms.length>0){
result += "<h3>[개별 매력살 해석]</h3>";
charms.forEach(function(c){
switch(c){
case "도화살": result+='<p><strong>도화살:</strong> 타고난 외모적 매력과 밝은 인상. 이성운 강함.</p>'; break;
case "홍염살": result+='<p><strong>홍염살:</strong> 부드러운 감성과 연애 감성 뛰어남.</p>'; break;
case "천을귀인": result+='<p><strong>천을귀인:</strong> 신뢰와 귀인성 매력, 도움을 받는 인간관계.</p>'; break;
case "문창살": result+='<p><strong>문창살:</strong> 지적 매력, 언변력 뛰어남.</p>'; break;
case "상관살": result+='<p><strong>상관살:</strong> 자유로운 끼, 표현력이 강함.</p>'; break;
case "화개살": result+='<p><strong>화개살:</strong> 신비로운 감성, 예술적 아우라.</p>'; break;
case "천덕귀인": result+='<p><strong>천덕귀인:</strong> 따뜻하고 인덕 많은 인간관계.</p>'; break;
}
});
}

// 종합 해석 추가
if (charms.length>1){
result += "<h3>[매력 조합 종합 해석]</h3>";
result += "<p>당신은 "+charms.join(", ")+"을 모두 갖춘 풍부한 매력을 가진 사람입니다. 연애운과 인간관계운이 매우 강하며 사회적 인기와 귀인운도 기대할 수 있습니다.</p>";
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