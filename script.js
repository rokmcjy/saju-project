document.getElementById("unknownTime").addEventListener("change",function(){document.getElementById("birthTime").disabled=this.checked;});
document.getElementById("birthForm").addEventListener("submit",function(e){e.preventDefault();
const t=document.getElementById("birthDate").value,n=document.getElementById("birthTime").value,a=document.getElementById("unknownTime").checked,d=document.getElementById("gender").value;
const i=new Date(t),r=i.getFullYear(),o=["원숭이","닭","개","돼지","쥐","소","호랑이","토끼","용","뱀","말","양"][r%12];
let s="생년월일: "+t.replaceAll("-","년 ").replace(" ","월 ")+"일<br>";
s+="출생시간: "+(a?"모름":n)+"<br>",
s+="성별: "+("male"===d?"남자":"여자")+"<br><br>",
s+="<strong>[기본 정보]</strong><br>- 띠: "+o+"띠<br><br>",
s+="<strong>[오행 성향]</strong><br>",
s+=r%5==0?"- 목(木) 기운 강함<br>":r%5==1?"- 화(火) 기운 강함<br>":r%5==2?"- 토(土) 기운 강함<br>":r%5==3?"- 금(金) 기운 강함<br>":"- 수(水) 기운 강함<br>",
s+="<br><strong>[성격과 연애성향]</strong><br>",
s+=r%2==0?"- 성격: 리더십, 직설적<br>- 연애 스타일: 직진형<br>":"- 성격: 섬세하고 배려형<br>- 연애 스타일: 신중하고 부드러운 타입<br>",
s+="<br><strong>[매력살 분석]</strong><br>",
s+=["호랑이","말","개"].includes(o)?"- 도화살 있음: 인간관계 활발, 이성운 주의 필요<br>":"- 도화살 없음<br>",
s+=["돼지","토끼","양"].includes(o)?"- 홍염살 있음: 은은한 매력, 인기운 강함<br>":"- 홍염살 없음<br>",
s+=["쥐","용","원숭이"].includes(o)?"- 천을귀인 있음: 귀인운 강하고 주변 도움 많음<br>":"- 천을귀인 없음<br>",
s+="<br><strong>[대운 흐름]</strong><br>",
s+="- 30대: 인간관계와 연애운 확장<br>",
s+="- 40대: 재물 관리 신중<br>",
s+="- 50대: 귀인운 상승, 커리어 성장 기회<br>",
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