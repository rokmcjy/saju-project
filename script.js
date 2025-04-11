document.getElementById("unknownTime").addEventListener("change",function(){document.getElementById("birthTime").disabled=this.checked;});
document.getElementById("birthForm").addEventListener("submit",function(e){e.preventDefault();
const t=document.getElementById("birthDate").value,n=document.getElementById("birthTime").value,a=document.getElementById("unknownTime").checked,d=document.getElementById("gender").value;
const i=new Date(t),r=i.getFullYear(),o=["원숭이","닭","개","돼지","쥐","소","호랑이","토끼","용","뱀","말","양"][r%12];
let s="생년월일: "+t.replaceAll("-","년 ").replace(" ","월 ")+"일<br>";
s+="출생시간: "+(a?"모름":n)+"<br>",
s+="성별: "+("male"===d?"남자":"여자")+"<br><br>",
s+="<strong>[기본 정보]</strong><br>- 띠: "+o+"띠<br><br>",
s+="<strong>[오행 성향 풀이]</strong><br>";
switch(r%5){
case 0:s+="- 목(木) 기운 강함: 창의적이고 자유로운 성향. 리더십 발휘. 자율성 존중.<br>";break;
case 1:s+="- 화(火) 기운 강함: 열정적이고 주목받는 걸 좋아함. 추진력 강함.<br>";break;
case 2:s+="- 토(土) 기운 강함: 신중하고 책임감 있음. 조직을 안정시킴.<br>";break;
case 3:s+="- 금(金) 기운 강함: 냉정하고 논리적이며 목표지향적.<br>";break;
case 4:s+="- 수(水) 기운 강함: 감성적이며 지혜롭고 부드러운 성향.<br>";break;}
s+="<br><strong>[성격과 연애성향]</strong><br>",
s+=r%2==0?"- 성격: 리더십, 당당하고 솔직함<br>- 연애 스타일: 직진형, 감정표현 적극적<br>":"- 성격: 섬세하고 배려심 깊음<br>- 연애 스타일: 신중하고 따뜻함<br>",
s+="<br><strong>[매력살 분석]</strong><br>",
s+=["호랑이","말","개"].includes(o)?"- 도화살 있음: 사람을 끌어당기는 밝은 매력<br>- 연애에서 인기가 높음<br>- 주의: 과도한 관심으로 오해받을 수 있음<br><br>":"",
s+=["돼지","토끼","양"].includes(o)?"- 홍염살 있음: 은은한 감성 매력, 예술적 재능<br>- 연애에서 부드럽게 끌어당김<br>- 주의: 감정기복 주의<br><br>":"",
s+=["쥐","용","원숭이"].includes(o)?"- 천을귀인 있음: 귀인운 강함. 주변 도움 많음<br>- 인간관계 신뢰 중시<br><br>":"",
s+="<br><strong>[대운 흐름]</strong><br>",
s+="- 30대: 인간관계 확장 및 연애운 상승<br>",
s+="- 40대: 재물 관리 주의<br>",
s+="- 50대: 귀인운 상승, 커리어 기회 증가<br>",
document.getElementById("result").innerHTML=s,
document.getElementById("share-buttons").style.display="flex";
});
document.getElementById("saveImageBtn").addEventListener("click",function(){html2canvas(document.querySelector("#result")).then(e=>{const t=document.createElement("a");t.download="saju_result.png",t.href=e.toDataURL(),t.click();});});
document.getElementById("kakaoShareBtn").addEventListener("click",function(){
const e=window.location.href;window.open("https://api.whatsapp.com/send?text="+encodeURIComponent(e));
});
document.getElementById("smsShareBtn").addEventListener("click",function(){
const e=window.location.href;window.location.href="sms:?body="+encodeURIComponent(e);
});