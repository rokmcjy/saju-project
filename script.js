// Kakao SDK 초기화 (DOMContentLoaded 이후)
document.addEventListener("DOMContentLoaded", function() {
    if (!Kakao.isInitialized()) {
        Kakao.init('774979357d4033f924a2a83f0c6e103c');  // 네 JS 키
    }
});

// 출생시간 모름 체크
document.getElementById("unknownTime").addEventListener("change", function() {
    document.getElementById("birthTime").disabled = this.checked;
});

// 사주풀이 시작
document.getElementById("birthForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const birthDate = document.getElementById("birthDate").value;
    const birthTime = document.getElementById("birthTime").value;
    const unknownTime = document.getElementById("unknownTime").checked;
    const gender = document.getElementById("gender").value;

    const date = new Date(birthDate);
    const year = date.getFullYear();
    const animalList = ["원숭이", "닭", "개", "돼지", "쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양"];
    const animal = animalList[year % 12];

    let result = `생년월일: ${birthDate.replaceAll("-", "년 ").replace(" ", "월 ")}일<br>`;
    result += `출생시간: ${unknownTime ? "모름" : birthTime}<br>`;
    result += `성별: ${gender === "male" ? "남자" : "여자"}<br><br>`;
    result += `<strong>[띠 정보]</strong><br>- 띠: ${animal}띠<br><br>`;

    result += `<strong>[오행 성향 풀이]</strong><br>`;
    switch (year % 5) {
        case 0:
            result += "- 목(木) 기운 강함<br>성격: 자유롭고 창의적<br>장점: 리더십 발휘<br>주의: 고집이 셀 수 있음<br><br>";
            break;
        case 1:
            result += "- 화(火) 기운 강함<br>성격: 열정적이고 적극적<br>장점: 추진력, 카리스마<br>주의: 성급함 주의<br><br>";
            break;
        case 2:
            result += "- 토(土) 기운 강함<br>성격: 신중하고 성실<br>장점: 중심을 잡는 힘<br>주의: 고집, 답답함 주의<br><br>";
            break;
        case 3:
            result += "- 금(金) 기운 강함<br>성격: 냉정하고 이성적<br>장점: 승부근성 강함<br>주의: 인간관계가 냉정해질 수 있음<br><br>";
            break;
        case 4:
            result += "- 수(水) 기운 강함<br>성격: 감성적이고 지혜로움<br>장점: 부드럽고 이해심 많음<br>주의: 우유부단 조심<br><br>";
            break;
    }

    result += `<strong>[매력살 분석]</strong><br>`;
    if (["호랑이", "말", "개"].includes(animal)) {
        result += "- 도화살 있음: 밝고 적극적인 매력<br>- 연애에서 인기가 많음<br><br>";
    }
    if (["돼지", "토끼", "양"].includes(animal)) {
        result += "- 홍염살 있음: 감성적 매력, 예술적 감각<br>- 부드러운 연애 스타일<br><br>";
    }
    if (["쥐", "용", "원숭이"].includes(animal)) {
        result += "- 천을귀인 있음: 주변 도움 많음<br>- 인간관계 좋음<br><br>";
    }

    result += `<strong>[대운 흐름]</strong><br>`;
    result += "- 30대: 인간관계 및 연애운 상승<br>";
    result += "- 40대: 재물 관리 주의<br>";
    result += "- 50대: 귀인운 상승, 커리어 강화<br>";

    document.getElementById("result").innerHTML = result;
    document.getElementById("share-buttons").style.display = "flex";
});

// 결과 저장하기
document.getElementById("saveImageBtn").addEventListener("click", function() {
    html2canvas(document.querySelector("#result")).then(function(canvas) {
        const link = document.createElement("a");
        link.download = "saju_result.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});

// 카카오톡으로 공유
document.getElementById("kakaoShareBtn").addEventListener("click", function() {
    Kakao.Link.sendDefault({
        objectType: 'text',
        text: '매력살 사주풀이 결과를 공유합니다. 자세한 결과는 아래 "자세히 보기"를 눌러주세요!',
  link: {
    mobileWebUrl: 'https://rokmcjy.github.io/saju-project/',
    webUrl: 'https://rokmcjy.github.io/saju-project/'
        }
    });
});

// 문자로 공유
document.getElementById("smsShareBtn").addEventListener("click", function() {
    const url = window.location.href;
    window.location.href = `sms:?body=${encodeURIComponent(url)}`;
});
