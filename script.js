function generateSaju(birthDate, birthTime, unknownTime, gender) {
    const birth = new Date(birthDate);
    const year = birth.getFullYear();
    const animals = ['원숭이', '닭', '개', '돼지', '쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양'];
    const animal = animals[year % 12];

    let sajuResult = "생년월일: " + birthDate.replaceAll("-", "년 ").replace(" ", "월 ") + "일<br>";
    sajuResult += "출생시간: " + (unknownTime ? "모름" : birthTime) + "<br>";
    sajuResult += "성별: " + (gender === "male" ? "남자" : "여자") + "<br><br>";

    sajuResult += "<strong>[기본 정보]</strong><br>";
    sajuResult += "- 띠: " + animal + "띠<br>";

    sajuResult += "<br><strong>[연애 성향]</strong><br>";
    if (year % 2 === 0) {
        sajuResult += "- 연애 성향: 적극적, 리더형<br>";
    } else {
        sajuResult += "- 연애 성향: 신중형, 배려형<br>";
    }

    sajuResult += "<br><strong>[매력살 분석]</strong><br>";
    if (['쥐','말','토끼','닭'].includes(animal)) {
        sajuResult += "- 도화살: 부드러운 매력, 이성에게 신뢰감을 주는 타입<br>";
    } else {
        sajuResult += "- 도화살: 실력으로 인정받는 타입<br>";
    }

    if (year % 10 === 4 || year % 10 === 9) {
        sajuResult += "- 홍염살: 차분하지만 내면에 강한 매력을 가진 스타일<br>";
    } else {
        sajuResult += "- 홍염살: 절제된 매력<br>";
    }

    if (year % 10 === 1 || year % 10 === 6) {
        sajuResult += "- 천을귀인: 귀인운 강함, 인간관계 좋음<br>";
    } else {
        sajuResult += "- 천을귀인: 현실적이고 신중한 인간관계 스타일<br>";
    }

    sajuResult += "<br><strong>[대운 흐름]</strong><br>";
    sajuResult += "- 30대: 인간관계 및 연애운 상승<br>";
    sajuResult += "- 40대: 재물 관리 주의<br>";
    sajuResult += "- 50대: 귀인운 상승, 성장 기회 있음<br>";

    return sajuResult;
}

document.getElementById("unknownTime").addEventListener("change", function() {
    document.getElementById("birthTime").disabled = this.checked;
});

document.getElementById("birthForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const birthDate = document.getElementById("birthDate").value;
    const birthTime = document.getElementById("birthTime").value;
    const unknownTime = document.getElementById("unknownTime").checked;
    const gender = document.getElementById("gender").value;

    const sajuResult = generateSaju(birthDate, birthTime, unknownTime, gender);
    document.getElementById("result").innerHTML = sajuResult;
    document.getElementById("share-buttons").style.display = "flex";
});

document.getElementById("saveImageBtn").addEventListener("click", function() {
    html2canvas(document.querySelector("#result")).then(canvas => {
        const link = document.createElement('a');
        link.download = 'saju_result.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

document.getElementById("kakaoShareBtn").addEventListener("click", function() {
    const url = window.location.href;
    window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(url));
});

document.getElementById("smsShareBtn").addEventListener("click", function() {
    const url = window.location.href;
    window.location.href = "sms:?body=" + encodeURIComponent(url);
});