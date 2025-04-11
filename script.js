document.getElementById("unknownTime").addEventListener("change",function(){document.getElementById("birthTime").disabled=this.checked;});
document.getElementById("birthForm").addEventListener("submit",function(e){e.preventDefault();
const t=document.getElementById("birthDate").value,n=document.getElementById("birthTime").value,a=document.getElementById("unknownTime").checked,d=document.getElementById("gender").value;
const i=new Date(t),r=i.getFullYear(),o=["원숭이","닭","개","돼지","쥐","소","호랑이","토끼","용","뱀","말","양"][r%12];
let l="생년월일: "+t.replaceAll("-","년 ").replace(" ","월 ")+"일<br>";
l+="출생시간: "+(a?"모름":n)+"<br>",
l+="성별: "+("male"===d?"남자":"여자")+"<br><br>",
l+="<strong>[기본 정보]</strong><br>- 띠: "+o+"띠<br><br>",
l+="<strong>[오행 성향]</strong><br>",
l+=r%5==0?"- 목(木) 기운 강함<br>":r%5==1?"- 화(火) 기운 강함<br>":r%5==2?"- 토(土) 기운 강함<br>":r%5==3?"- 금(金) 기운 강함<br>":"- 수(水) 기운 강함<br>",
l+="<br><strong>[성격과 연애성향]</strong><br>",
l+=r%2==0?"- 성격: 리더십, 적극적<br>- 연애 스타일: 직진형<br>":"- 성격: 섬세, 배려형<br>- 연애 스타일: 신중형<br>",
l+="<br><strong>[대운 흐름]</strong><br>",
l+="- 30대: 인간관계 확장 및 연애운 상승<br>",
l+="- 40대: 재물 관리 주의 필요<br>",
l+="- 50대: 귀인운 상승, 직업/커리어 기회 강화<br>",
document.getElementById("result").innerHTML=l,
document.getElementById("share-buttons").style.display="flex";
});
document.getElementById("saveImageBtn").addEventListener("click",function(){html2canvas(document.querySelector("#result")).then(e=>{const t=document.createElement("a");t.download="saju_result.png",t.href=e.toDataURL(),t.click();});});
document.getElementById("kakaoShareBtn").addEventListener("click",function(){
const e=window.location.href;window.open("https://api.whatsapp.com/send?text="+encodeURIComponent(e));
});
document.getElementById("smsShareBtn").addEventListener("click",function(){
const e=window.location.href;window.location.href="sms:?body="+encodeURIComponent(e);
});