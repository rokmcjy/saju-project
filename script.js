
function generateSaju(birthDate, birthTime, unknownTime, gender) {
    const birth = new Date(birthDate);
    const year = birth.getFullYear();
    const month = birth.getMonth() + 1;
    const day = birth.getDate();

    const animals = ['원숭이', '닭', '개', '돼지', '쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양'];
    const animal = animals[year % 12];

    const branchTable = ['신', '유', '술', '해', '자', '축', '인', '묘', '진', '사', '오', '미'];
    const yearBranch = branchTable[year % 12];

    let peachBlossom = "없음";
    if ((animal === '쥐' && (['묘','미','유','해'].includes(yearBranch))) ||
        (animal === '말' && (['자','오','신','술'].includes(yearBranch))) ||
        (animal === '토끼' && (['자','오','신','술'].includes(yearBranch))) ||
        (animal === '닭' && (['오','자','인','진'].includes(yearBranch)))) {
        peachBlossom = "있음";
    }

    let hongyeom = "없음";
    if ([4,9].includes(year % 10)) {
        hongyeom = "있음";
    }

    let heavenlyNoble = "없음";
    if ([1,6].includes(year % 10)) {
        heavenlyNoble = "있음";
    }

    let result = `생년월일: ${year}년 ${month}월 ${day}일<br>`;
    result += `출생시간: ${unknownTime ? "모름" : birthTime}<br>`;
    result += `성별: ${gender === "male" ? "남자" : "여자"}<br><br>`;
    result += `<strong>[매력살 분석]</strong><br>`;

    if (peachBlossom === "있음") {
        result += gender === "male" ?
            `- 도화살: 여성관계 활발, 연애운 강함. 인간관계에서 이성문제 주의 필요.<br>` :
            `- 도화살: 뛰어난 매력과 외모로 이성에게 인기가 많음. 주목받는 삶.<br>`;
    } else {
        result += `- 도화살: 기본적인 인간관계를 유지하며, 실력으로 인정받는 스타일.<br>`;
    }

    if (hongyeom === "있음") {
        result += gender === "male" ?
            `- 홍염살: 섹시하고 카리스마 있는 인상, 대외적 매력 강함.<br>` :
            `- 홍염살: 강렬한 매력, 감성적이고 아름다운 이미지로 인기 많음.<br>`;
    } else {
        result += `- 홍염살: 차분하고 절제된 인상, 신뢰감을 주는 스타일.<br>`;
    }

    if (heavenlyNoble === "있음") {
        result += gender === "male" ?
            `- 천을귀인: 귀인운이 강하고, 리더십과 신뢰를 얻음.<br>` :
            `- 천을귀인: 신비로운 매력과 고급스러운 인상으로 존경받음.<br>`;
    } else {
        result += `- 천을귀인: 친근하고 소탈하여 주변과 조화롭게 어울림.<br>`;
    }

    return result;
}

function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
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
    if (!gender) {
        alert("성별을 선택해주세요.");
        return;
    }
    const sajuResult = generateSaju(birthDate, birthTime, unknownTime, gender);

    const uniqueId = createUniqueId();
    localStorage.setItem(uniqueId, JSON.stringify({ birthDate, birthTime, unknownTime, gender, sajuResult }));

    const newUrl = window.location.origin + window.location.pathname + "#" + uniqueId;
    document.getElementById("result").innerHTML = `
        <p>사주풀이 완료!</p>
        <div id="sajuOutput">\${sajuResult}</div>
        <p><a href="\${newUrl}">\${newUrl}</a><br>(링크를 복사해서 저장하세요!)</p>
    `;
    document.getElementById("saveImageBtn").style.display = "block";
});

document.getElementById("saveImageBtn").addEventListener("click", function() {
    html2canvas(document.querySelector("#sajuOutput")).then(canvas => {
        const link = document.createElement('a');
        link.download = 'saju_result.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

window.addEventListener("load", function() {
    const id = window.location.hash.replace("#", "");
    if (id) {
        const data = JSON.parse(localStorage.getItem(id));
        if (data) {
            document.getElementById("main").innerHTML = `
                <h2>당신의 사주 결과</h2>
                <div id="sajuOutput">\${data.sajuResult}</div>
                <button id="saveImageBtn">결과를 이미지로 저장</button>
            `;
            document.getElementById("saveImageBtn").addEventListener("click", function() {
                html2canvas(document.querySelector("#sajuOutput")).then(canvas => {
                    const link = document.createElement('a');
                    link.download = 'saju_result.png';
                    link.href = canvas.toDataURL();
                    link.click();
                });
            });
        }
    }
});
