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
s+=r%2==0?"- 성격: 리더십, 당당하고 직설적<br>- 연애 스타일: 적극적이고 직진하는 타입<br>":"- 성격: 섬세하고 배려심 깊음<br>- 연애 스타일: 신중하고 따뜻하게 다가가는 타입<br>",
s+="<br><strong>[매력살 분석]</strong><br>",
s+=["호랑이","말","개"].includes(o)?"- 도화살 있음: 사람을 끌어당기는 매력, 밝고 활발<br>- 연애에서는 적극적이고 설레는 스타일<br>- 주의: 인기에 따른 오해 조심<br><br>":"",
s+=["돼지","토끼","양"].includes(o)?"- 홍염살 있음: 은은하고 감성적인 매력, 인기 강함<br>- 연애에서는 부드럽게 끌어당김<br>- 주의: 감성 기복 조심<br><br>":"",
s+=["쥐","용","원숭이"].includes(o)?"- 천을귀인 있음: 인간관계에 귀인이 많아 도움받음<br>- 신뢰감 주는 인간관계 형성<br><br>":"",
s+="<br><strong>[대운 흐름]</strong><br>",
s+="- 30대: 인간관계 및 연애운 상승<br>",
s+="- 40대: 재물 관리 주의 필요<br>",
s+="- 50대: 귀인운 상승, 직업/커리어 기회 확대<br>",
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