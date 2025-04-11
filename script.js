// 출생시간 모름 체크
document.getElementById("unknownTime").addEventListener("change",function(){document.getElementById("birthTime").disabled=this.checked;});

// 사주풀이 시작
document.getElementById("birthForm").addEventListener("submit",function(e){
e.preventDefault();
const t=document.getElementById("birthDate").value,
n=document.getElementById("birthTime").value,
a=document.getElementById("unknownTime").checked,
d=document.getElementById("gender").value;
const i=new Date(t),
r=i.getFullYear(),
o=["원숭이","닭","개","돼지","쥐","소","호랑이","토끼","용","뱀","말","양"][r%12];
let s="생년월일: "+t.replaceAll("-","년 ").replace(" ","월 ")+"일<br>";
s+="출생시간: "+(a?"모름":n)+"<br>",
s+="성별: "+("male"===d?"남자":"여자")+"<br><br>",
s+="<strong>[띠 정보]</strong><br>- 띠: "+o+"띠<br><br>",
s+="<strong>[오행 성향 풀이]</strong><br>";
switch(r%5){
case 0:s+="- 목(木) 기운 강함<br>성격: 자유롭고 창의적<br>장점: 리더십 발휘<br>주의: 고집이 세질 수 있음<br><br>";break;
case 1:s+="- 화(火) 기운 강함<br>성격: 열정적이고 적극적<br>장점: 추진력, 카리스마<br>주의: 성급함 주의<br><br>";break;
case 2:s+="- 토(土) 기운 강함<br>성격: 신중하고 성실<br>장점: 중심 잡는 역할<br>주의: 고집, 답답함 주의<br><br>";break;
case 3:s+="- 금(金) 기운 강함<br>성격: 냉정하고 이성적<br>장점: 승부근성 강함<br>주의: 인간관계 냉정해질 수 있음<br><br>";break;
case 4:s+="- 수(水) 기운 강함<br>성격: 감성적이고 지혜로움<br>장점: 부드럽고 이해심 많음<br>주의: 우유부단 조심<br><br>";break;}
s+="<strong>[매력살 분석]</strong><br>",
s+=["호랑이","말","개"].includes(o)?"- 도화살 있음: 밝고 적극적인 매력<br>- 연애에서 인기가 많음<br><br>":"",
s+=["돼지","토끼","양"].includes(o)?"- 홍염살 있음: 감성적 매력, 예술적 감각<br>- 부드러운 연애 스타일<br><br>":"",
s+=["쥐","용","원숭이"].includes(o)?"- 천을귀인 있음: 주변 도움 많음<br>- 인간관계 좋음<br><br>":"",
s+="<strong>[대운 흐름]</strong><br>",
s+="- 30대: 인간관계 및 연애운 상승<br>",
s+="- 40대: 재물 관리 주의<br>",
s+="- 50대: 귀인운 상승, 커리어 강화<br>",
document.getElementById("result").innerHTML=s,
document.getElementById("share-buttons").style.display="flex";
});

// 저장 버튼
document.getElementById("saveImageBtn").addEventListener("click",function(){
html2canvas(document.querySelector("#result")).then(e=>{const t=document.createElement("a");
t.download="saju_result.png",
t.href=e.toDataURL(),
t.click();});
});

// 카카오톡 공유 버튼
document.getElementById("kakaoShareBtn").addEventListener("click",function(){
// 여기에 본인의 JavaScript 키를 넣으세요
if (!Kakao.isInitialized()) {
    Kakao.init('774979357d4033f924a2a83f0c6e103c'); 
}
Kakao.Link.sendDefault({
  objectType: 'text',
  text: '매력살 사주풀이 결과를 공유합니다!',
  link: {
    mobileWebUrl: window.location.href,
    webUrl: window.location.href
  }
});
});

// 문자로 공유
document.getElementById("smsShareBtn").addEventListener("click",function(){
const e=window.location.href;
window.location.href="sms:?body="+encodeURIComponent(e);
});