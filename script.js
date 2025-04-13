/**
 * 매력살 사주풀이 시스템
 * 개인 사주에 따라 다양한 매력살을 분석하는 자바스크립트 코드
 * 생년월일, 시간, 성별에 따라 개인화된 결과를 제공합니다.
 */

// 카카오톡 API 초기화 (앱 키 필요)
if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
    Kakao.init('774979357d4033f924a2a83f0c6e103c');
}

// 출생시간 모름 체크박스 이벤트
document.getElementById("unknownTime").addEventListener("change", function() {
    document.getElementById("birthTime").disabled = this.checked;
});

// 사주풀이 폼 제출 이벤트
document.getElementById("birthForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // 입력값 가져오기
    const birthDate = document.getElementById("birthDate").value,
          birthTime = document.getElementById("birthTime").value,
          unknownTime = document.getElementById("unknownTime").checked,
          gender = document.getElementById("gender").value;
    
    // 날짜 분석
    const date = new Date(birthDate),
          year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate();
    
    // 시간 정보 분석 (시간을 알 경우)
    let hour = 0;
    if (!unknownTime && birthTime) {
        const timeParts = birthTime.split(':');
        hour = parseInt(timeParts[0]);
    }
    
    // 기본 사주 정보 계산
    const zodiac = ["원숭이", "닭", "개", "돼지", "쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양"][year % 12];
    const elements = ["수", "목", "화", "토", "금"];
    const element = elements[year % 5];
    
    // 월령 (태어난 달에 따른 영향)
    const monthElement = ["금", "토", "목", "수", "화", "토", "금", "화", "목", "수", "토", "금"][month - 1];
    
    // 일주 (태어난 날에 따른 영향) - 간략화된 버전
    const dayElement = ["금", "화", "수", "목", "토"][day % 5];
    
    // 시주 (태어난 시간에 따른 영향) - 간략화된 버전
    const hourElement = unknownTime ? "" : ["수", "화", "토", "금", "목"][Math.floor(hour / 5) % 5];
    
    // 성격 특성 정의
    const traits = {
        "수": "감성적이고 직관적",
        "목": "성장하고 확장하는 기운",
        "화": "열정적이고 추진력 강함",
        "토": "안정적이고 성실함",
        "금": "냉철하고 현실적"
    };
    
    // 성격 및 연애 성향 계산 (연도 오행 + 월령 오행 조합)
    const personalityTraits = calculatePersonalityTraits(element, monthElement, gender);
    const loveStyle = calculateLoveStyle(element, monthElement, zodiac, gender);
    
    // 결과 시작
    let result = "<h2>감성 매력살 사주풀이 결과</h2>";
    result += "<p>생년월일: " + year + "년 " + month + "월 " + day + "일</p>";
    result += "<p>출생시간: " + (unknownTime ? "모름" : birthTime) + "</p>";
    result += "<p>성별: " + (gender === "male" ? "남자" : "여자") + "</p><br>";
    
    result += "<h3>[기본 정보]</h3>";
    result += "<p>- 띠: " + zodiac + "띠</p>";
    result += "<p>- 연도 오행: " + element + " (" + traits[element] + ")</p>";
    result += "<p>- 월령 오행: " + monthElement + "</p>";
    result += "<p>- 일주 오행: " + dayElement + "</p>";
    if (!unknownTime) {
        result += "<p>- 시주 오행: " + hourElement + "</p>";
    }
    
    result += "<h3>[성격과 연애성향]</h3>";
    result += "<p>- 성격: " + personalityTraits + "</p>";
    result += "<p>- 연애 스타일: " + loveStyle + "</p>";
    
    // 개인화된 대운 흐름
    result += "<h3>[대운 흐름]</h3>";
    const fortunePeriods = calculateFortunePeriods(zodiac, element, monthElement, gender);
    result += fortunePeriods;
    
    // 매력살 분석 - 개인 사주에 따라 정교한 방식으로 계산
    const charms = calculateCharms(zodiac, month, day, hour, element, monthElement, dayElement, hourElement, gender, unknownTime);
    
    if (charms.length > 0) {
        result += "<h3>[매력살 분석]</h3>";
        const charmDescriptions = {
            "도화살": "타고난 외모 매력, 이성운 강함",
            "홍염살": "부드러운 감성, 연애 감각 탁월",
            "천을귀인": "귀인운, 신뢰를 얻는 매력",
            "문창살": "지적 매력, 언변력 뛰어남",
            "상관살": "자유롭고 끼 넘치는 성격",
            "화개살": "신비로운 감성, 예술적 아우라",
            "천덕귀인": "따뜻하고 인덕 많은 인간관계",
            "합살": "사람을 끌어당기는 강한 카리스마",
            "계살": "진정성 있는 소통력, 깊은 유대감 형성",
            "식신살": "섬세한 감성과 요리 솜씨"
        };
        
        // 매력살 나열 및 상세 설명
        charms.forEach(function(charm, index) {
            const details = getCharmDetails(charm, zodiac, month, gender);
            result += `<p>${index + 1}. ${charm}: ${charmDescriptions[charm]}</p>`;
            result += `<p class="charm-detail">${details}</p>`;
        });
    }
    
    // 매력살 종합 해석
    if (charms.length > 0) {
        result += "<h3>[매력 종합 해석]</h3>";
        result += getCharmCombinationAnalysis(charms, zodiac, element, gender);
    }
    
    // 결과 표시
    document.getElementById("result").innerHTML = result;
    document.getElementById("share-buttons").style.display = "flex";
});

/**
 * 매력살 계산 함수 - 개인화된 매력살을 계산
 * @param {string} zodiac - 띠
 * @param {number} month - 월
 * @param {number} day - 일
 * @param {number} hour - 시
 * @param {string} yearElement - 연도 오행
 * @param {string} monthElement - 월령 오행
 * @param {string} dayElement - 일주 오행
 * @param {string} hourElement - 시주 오행
 * @param {string} gender - 성별
 * @param {boolean} unknownTime - 시간 모름 여부
 * @returns {Array} - 매력살 배열
 */
function calculateCharms(zodiac, month, day, hour, yearElement, monthElement, dayElement, hourElement, gender, unknownTime) {
    let charms = [];
    
    // 1. 기본 띠(zodiac)별 매력살 
    if (["호랑이", "말", "개"].includes(zodiac)) charms.push("도화살");
    if (["돼지", "토끼", "양"].includes(zodiac)) charms.push("홍염살");
    if (["쥐", "용", "원숭이"].includes(zodiac)) charms.push("천을귀인");
    if (["닭", "뱀", "소"].includes(zodiac)) charms.push("문창살");
    
    // 2. 월별 추가 매력살
    if ((month === 3 || month === 4) && ["용", "쥐", "원숭이"].includes(zodiac)) {
        if (!charms.includes("상관살")) charms.push("상관살");
    }
    
    if ((month === 5 || month === 6) && ["말", "호랑이", "개"].includes(zodiac)) {
        if (!charms.includes("상관살")) charms.push("상관살");
    }
    
    if ((month === 9 || month === 10) && ["양", "돼지", "토끼"].includes(zodiac)) {
        if (!charms.includes("화개살")) charms.push("화개살");
    }
    
    // 3. 일별 추가 매력살 (날짜 기반)
    if ([1, 10, 19, 28].includes(day)) {
        if (!charms.includes("합살")) charms.push("합살");
    }
    
    if ([4, 13, 22, 31].includes(day)) {
        if (!charms.includes("천덕귀인") && ["소", "토끼", "양"].includes(zodiac)) {
            charms.push("천덕귀인");
        }
    }
    
    // 4. 시간별 매력살 (시간을 아는 경우)
    if (!unknownTime) {
        // 오전 시간대 (6-12시)
        if (hour >= 6 && hour < 12) {
            if (["수", "화"].includes(hourElement) && !charms.includes("계살")) {
                charms.push("계살");
            }
        }
        
        // 오후 시간대 (12-18시)
        if (hour >= 12 && hour < 18) {
            if (["목", "토"].includes(hourElement) && !charms.includes("식신살")) {
                charms.push("식신살");
            }
        }
    }
    
    // 5. 성별에 따른 매력살 차이
    if (gender === "female") {
        // 여성의 경우 도화살이 더 강조됨
        if ((month >= 3 && month <= 8) && !charms.includes("도화살")) {
            charms.push("도화살");
        }
        
        // 여성이면서 화나 금 오행이 강한 경우 문창살 추가
        if ((yearElement === "화" || monthElement === "화" || yearElement === "금" || monthElement === "금") 
            && !charms.includes("문창살")) {
            charms.push("문창살");
        }
    } else {
        // 남성의 경우 천을귀인이 더 강조됨
        if ((yearElement === "수" || monthElement === "수") && !charms.includes("천을귀인")) {
            charms.push("천을귀인");
        }
        
        // 남성이면서 토나 목 오행이 강한 경우 화개살 추가
        if ((yearElement === "토" || monthElement === "토" || yearElement === "목" || monthElement === "목") 
            && !charms.includes("화개살")) {
            charms.push("화개살");
        }
    }
    
    // 6. 오행 조합에 따른 매력살
    // 수(水)와 목(木)의 조합
    if ((yearElement === "수" && monthElement === "목") || (yearElement === "목" && monthElement === "수")) {
        if (!charms.includes("천을귀인")) charms.push("천을귀인");
    }
    
    // 화(火)와 토(土)의 조합
    if ((yearElement === "화" && monthElement === "토") || (yearElement === "토" && monthElement === "화")) {
        if (!charms.includes("홍염살")) charms.push("홍염살");
    }
    
    // 금(金)과 수(水)의 조합
    if ((yearElement === "금" && monthElement === "수") || (yearElement === "수" && monthElement === "금")) {
        if (!charms.includes("문창살")) charms.push("문창살");
    }
    
    // 7. 특정 날짜 조합에 따른 추가 매력살
    if ((day % 2 === 0 && month % 2 === 0) || (day % 2 === 1 && month % 2 === 1)) {
        // 날짜와 월이 모두 짝수이거나 모두 홀수인 경우 - 음양의 조화
        if (!charms.includes("합살") && charms.length < 4) {
            charms.push("합살");
        }
    }
    
    // 최대 4개까지만 제한 (너무 많으면 신뢰성이 떨어짐)
    return charms.slice(0, 4);
}

/**
 * 매력살 상세 설명 함수
 * @param {string} charm - 매력살 이름
 * @param {string} zodiac - 띠
 * @param {number} month - 월
 * @param {string} gender - 성별
 * @returns {string} - 상세 설명
 */
function getCharmDetails(charm, zodiac, month, gender) {
    const details = {
        "도화살": {
            "호랑이": "당신의 카리스마와 자신감이 특히 돋보이는 도화살입니다. 첫인상이 강렬하고 사람들의 시선을 사로잡습니다.",
            "말": "열정적이고 활동적인 에너지가 매력인 도화살입니다. 밝은 미소와 긍정적인 태도가 상대방을 편안하게 합니다.",
            "개": "진실된 마음과 신뢰감이 느껴지는 도화살입니다. 진심어린 대화와 정직함이 이성에게 큰 매력으로 다가갑니다.",
            "default": "타고난 외모와 분위기로 이성의 호감을 자연스럽게 얻는 매력이 있습니다."
        },
        "홍염살": {
            "돼지": "따뜻한 감성과 배려심이 돋보이는 홍염살입니다. 상대방을 편안하게 하는 분위기가 매력적입니다.",
            "토끼": "섬세한 감정 표현과 부드러운 카리스마가 매력인 홍염살입니다. 낭만적인 분위기를 잘 만듭니다.",
            "양": "창의적이고 예술적인 감성이 돋보이는 홍염살입니다. 독특한 시각과 취향이 이성의 관심을 끕니다.",
            "default": "감성적인 교감 능력과 따뜻한 에너지로 상대방의 마음을 열게 만듭니다."
        },
        "천을귀인": {
            "쥐": "재치 있는 대화와 지적인 매력이 돋보이는 천을귀인입니다. 상황을 유리하게 이끄는 능력이 있습니다.",
            "용": "당당한 자신감과 리더십이 느껴지는 천을귀인입니다. 주변 사람들에게 신뢰와 존경을 받습니다.",
            "원숭이": "유머 감각과 재치가 뛰어난 천을귀인입니다. 어려운 상황에서도 긍정적인 해결책을 찾아냅니다.",
            "default": "인복이 많고 주변의 도움을 자연스럽게 받을 수 있는 특별한 기운이 있습니다."
        },
        "문창살": {
            "닭": "논리적인 사고와 명확한 표현력이 돋보이는 문창살입니다. 지적인 대화가 큰 매력입니다.",
            "뱀": "깊은 통찰력과 비밀스러운 매력이 있는 문창살입니다. 상대방의 마음을 꿰뚫어 보는 능력이 있습니다.",
            "소": "믿음직한 지식과 안정감 있는 대화가 매력인 문창살입니다. 신중하고 진중한 모습이 신뢰를 줍니다.",
            "default": "지적인 대화 능력과 언변이 뛰어나 상대방을 설득하고 매료시킬 수 있습니다."
        },
        "상관살": "개성 있고 자유로운 영혼의 매력이 있으며, 독특한 시각과 표현으로 주변을 즐겁게 합니다.",
        "화개살": "신비로운 분위기와 예술적 감성이 돋보이는 매력이 있으며, 상대방의 호기심을 자극합니다.",
        "천덕귀인": "따뜻한 인품과 배려심이 돋보이며, 주변 사람들에게 좋은 인상을 남기고 인덕이 두텁습니다.",
        "합살": "사람들을 자연스럽게 끌어당기는 카리스마가 있으며, 여러 사람들과 조화롭게 어울리는 능력이 있습니다.",
        "계살": "깊이 있는 대화와 진정성 있는 소통으로 강한 유대감을 형성하며, 한번 인연을 맺으면 오래 지속됩니다.",
        "식신살": "세심한 배려와 감성적인 케어 능력이 뛰어나며, 상대방의 필요를 미리 알아차리는 직관력이 있습니다."
    };
    
    // 기본 설명 가져오기
    let detail = "";
    
    // 띠에 따른 상세 설명이 있는 경우
    if (details[charm][zodiac]) {
        detail = details[charm][zodiac];
    } 
    // 기본 설명만 있는 경우
    else if (details[charm]["default"]) {
        detail = details[charm]["default"];
    }
    // 그 외의 경우
    else {
        detail = details[charm];
    }
    
    // 성별에 따른 추가 설명
    if (gender === "female" && charm === "도화살") {
        detail += " 여성으로서 특히 이성에게 자연스러운 호감을 얻는 매력이 강합니다.";
    } else if (gender === "male" && charm === "천을귀인") {
        detail += " 남성으로서 특히 주변의 도움과 신뢰를 얻는 귀인운이 강합니다.";
    }
    
    // 계절(월)에 따른 추가 설명
    const seasons = {
        "봄": [3, 4, 5],
        "여름": [6, 7, 8],
        "가을": [9, 10, 11],
        "겨울": [12, 1, 2]
    };
    
    if (seasons["봄"].includes(month) && ["도화살", "상관살"].includes(charm)) {
        detail += " 봄에 태어난 당신은 이 매력이 더욱 활성화되어 발산됩니다.";
    } else if (seasons["여름"].includes(month) && ["홍염살", "화개살"].includes(charm)) {
        detail += " 여름에 태어난 당신은 이 매력이 더욱 활성화되어 발산됩니다.";
    } else if (seasons["가을"].includes(month) && ["문창살", "식신살"].includes(charm)) {
        detail += " 가을에 태어난 당신은 이 매력이 더욱 활성화되어 발산됩니다.";
    } else if (seasons["겨울"].includes(month) && ["천을귀인", "천덕귀인", "계살"].includes(charm)) {
        detail += " 겨울에 태어난 당신은 이 매력이 더욱 활성화되어 발산됩니다.";
    }
    
    return detail;
}

/**
 * 매력살 조합 분석 함수
 * @param {Array} charms - 매력살 배열
 * @param {string} zodiac - 띠
 * @param {string} element - 오행
 * @param {string} gender - 성별
 * @returns {string} - 조합 분석
 */
function getCharmCombinationAnalysis(charms, zodiac, element, gender) {
    let analysis = "";
    
    // 매력살 개수에 따른 기본 분석
    if (charms.length >= 3) {
        analysis += "<p>- 다양한 매력살을 함께 지닌 인기형 사주입니다. 여러 상황에서 다재다능한 매력을 발산할 수 있습니다.</p>";
    } else if (charms.length === 2) {
        analysis += "<p>- 조화로운 매력살 조합으로 균형 잡힌 매력을 가지고 있습니다.</p>";
    } else {
        analysis += "<p>- 집중된 한 가지 매력살로 특정 분야에서 두각을 나타낼 수 있습니다.</p>";
    }
    
    // 특별한 매력살 조합 분석
    if (charms.includes("도화살") && charms.includes("홍염살")) {
        analysis += "<p>- 외적인 매력과 감성적인 매력이 조화를 이루어 이성 관계에서 특히 강점을 보입니다.</p>";
    }
    
    if (charms.includes("천을귀인") && charms.includes("천덕귀인")) {
        analysis += "<p>- 귀인운과 인덕이 겹쳐 주변의 도움과 인정을 받기 쉬운 복된 사주입니다.</p>";
    }
    
    if (charms.includes("문창살") && charms.includes("상관살")) {
        analysis += "<p>- 지적 매력과 자유로운 영혼이 조화를 이루어 창의적이고 독특한 매력을 발산합니다.</p>";
    }
    
    if (charms.includes("화개살") && charms.includes("식신살")) {
        analysis += "<p>- 예술적 감성과 섬세한 배려심이 결합되어 깊이 있는 교감을 나눌 수 있습니다.</p>";
    }
    
    if (charms.includes("도화살") && charms.includes("문창살")) {
        analysis += "<p>- 외적 매력과 지적 매력이 공존하여 첫인상부터 대화까지 상대방을 사로잡는 힘이 있습니다.</p>";
    }
    
    // 성별에 따른 추가 분석
    if (gender === "female") {
        if (charms.includes("도화살") || charms.includes("홍염살")) {
            analysis += "<p>- 여성으로서 타고난 부드러운 매력과 감성을 지녀 이성에게 자연스러운 호감을 얻습니다.</p>";
        }
    } else {
        if (charms.includes("천을귀인") || charms.includes("합살")) {
            analysis += "<p>- 남성으로서 신뢰감과 카리스마를 겸비하여 주변 사람들에게 든든한 존재감을 보여줍니다.</p>";
        }
    }
    
    // 오행과 띠에 따른 추가 분석
    if (element === "화" || element === "금") {
        analysis += "<p>- " + element + "의 기운이 강해 적극적이고 표현력 있는 매력으로 발전시킬 수 있습니다.</p>";
    } else {
        analysis += "<p>- " + element + "의 기운이 강해 차분하고 깊이 있는 매력으로 발전시킬 수 있습니다.</p>";
    }
    
    // 연애와 인간관계에 대한 조언
    analysis += "<p>- 연애운: ";
    if (charms.includes("도화살") || charms.includes("홍염살")) {
        analysis += "이성운이 좋으며 다양한 인연을 만날 기회가 있습니다. ";
    } else if (charms.includes("천을귀인") || charms.includes("천덕귀인")) {
        analysis += "질 좋은 인연을 만날 확률이 높으며 안정적인 관계를 형성할 수 있습니다. ";
    } else {
        analysis += "독특한 매력으로 특별한 인연을 기다리는 것이 좋습니다. ";
    }
    analysis += "</p>";
    
    // 직업과 재물운에 대한 조언
    analysis += "<p>- 직업/재물운: ";
    if (charms.includes("문창살") || charms.includes("식신살")) {
        analysis += "지적 능력이나 섬세함을 활용하는 직업에서 빛을 발할 수 있습니다. ";
    } else if (charms.includes("상관살") || charms.includes("화개살")) {
        analysis += "창의력과 예술성을 활용하는 분야에서 성공할 가능성이 높습니다. ";
    } else if (charms.includes("천을귀인") || charms.includes("합살")) {
        analysis += "대인관계를 활용한 사업이나 영업 분야에서 좋은 성과를 낼 수 있습니다. ";
    } else {
        analysis += "자신의 개성을 살린 분야에서 재능을 발휘할 수 있습니다. ";
    }
    analysis += "</p>";
    
    return analysis;
}

/**
 * 성격 특성 계산 함수
 * @param {string} yearElement - 연도 오행
 * @param {string} monthElement - 월령 오행
 * @param {string} gender - 성별
 * @returns {string} - 성격 특성
 */
function calculatePersonalityTraits(yearElement, monthElement, gender) {
    const baseTraits = {
        "수": "감성적이고 직관적인",
        "목": "성장 지향적이고 창의적인",
        "화": "열정적이고 추진력 있는",
        "토": "안정적이고 실용적인",
        "금": "냉철하고 논리적인"
    };
    
    // 기본 성격 (연도 오행 기반)
    let traits = baseTraits[yearElement];
    
    // 월령 오행과의 조합
    if (yearElement === monthElement) {
        traits += ", 특히 " + yearElement + "의 성질이 강화된";
    } else {
        // 상생 관계 (수→목→화→토→금→수)
        if ((yearElement === "수" && monthElement === "목") ||
            (yearElement === "목" && monthElement === "화") ||
            (yearElement === "화" && monthElement === "토") ||
            (yearElement === "토" && monthElement === "금") ||
            (yearElement === "금" && monthElement === "수")) {
            traits += ", 조화롭고 균형 잡힌";
        } 
        // 상극 관계 (수→화, 화→금, 금→목, 목→토, 토→수)
        else if ((yearElement === "수" && monthElement === "화") ||
                (yearElement === "화" && monthElement === "금") ||
                (yearElement === "금" && monthElement === "목") ||
                (yearElement === "목" && monthElement === "토") ||
                (yearElement === "토" && monthElement === "수")) {
            traits += ", 내면에 갈등이 있지만 그만큼 성장 가능성이 큰";
        } else {
            traits += ", 다양한 에너지를 가진";
        }
    }
    
    // 성별에 따른 성격 차이
    if (gender === "female") {
        if (yearElement === "화" || yearElement === "목") {
            traits += ", 활발하고 사교적인";
        } else if (yearElement === "금" || yearElement === "수") {
            traits += ", 섬세하고 직관력이 뛰어난";
        } else {
            traits += ", 따뜻하고 포용력 있는";
        }
    } else {
        if (yearElement === "화" || yearElement === "금") {
            traits += ", 리더십이 있고 추진력 있는";
        } else if (yearElement === "목" || yearElement === "수") {
            traits += ", 창의적이고 통찰력 있는";
        } else {
            traits += ", 책임감 있고 신뢰할 수 있는";
        }
    }
    
    return traits + " 성격입니다";
}

/**
 * 연애 스타일 계산 함수
 * @param {string} yearElement - 연도 오행
 * @param {string} monthElement - 월령 오행
 * @param {string} zodiac - 띠
 * @param {string} gender - 성별
 * @returns {string} - 연애 스타일
 */
function calculateLoveStyle(yearElement, monthElement, zodiac, gender) {
    let loveStyle = "";
    
    // 기본 연애 스타일 (오행 기반)
    const baseStyles = {
        "수": "감성적이고 깊이 있는 교감을 중시하는",
        "목": "성장과 발전을 함께하는 파트너십을 추구하는",
        "화": "열정적이고 로맨틱한 표현을 즐기는",
        "토": "안정적이고 헌신적인 관계를 원하는",
        "금": "현실적이면서도 세련된 연애를 추구하는"
    };
    
    loveStyle = baseStyles[yearElement];
    
    // 띠에 따른 연애 스타일 추가
    const zodiacStyles = {
        "쥐": "재치 있는 대화와 지적인 교류를 즐기는",
        "소": "신중하고 진실된 마음으로 접근하는",
        "호랑이": "자신감 있고 주도적인",
        "토끼": "부드럽고 낭만적인 분위기를 만드는",
        "용": "당당하고 열정적인",
        "뱀": "깊이 있고 신비로운 매력으로 이끄는",
        "말": "자유롭고 활동적인 데이트를 즐기는",
        "양": "따뜻하고 배려심 많은",
        "원숭이": "유머와 재치로 상대를 즐겁게 하는",
        "닭": "섬세한 계획과 준비로 상대를 감동시키는",
        "개": "진실되고 한결같은 마음으로 다가가는",
        "돼지": "넉넉한 마음과 포용력으로 상대를 편안하게 하는"
    };
    
    loveStyle += ", " + zodiacStyles[zodiac];
    
    // 성별과 오행 조합에 따른 추가 스타일
    if (gender === "female") {
        if (yearElement === "화" || yearElement === "금") {
            loveStyle += ", 적극적으로 자신의 마음을 표현하는";
        } else {
            loveStyle += ", 상대방의 마음을 섬세하게 읽어내는";
        }
    } else {
        if (yearElement === "화" || yearElement === "금") {
            loveStyle += ", 리드하고 이끌어가는";
        } else {
            loveStyle += ", 상대의 마음을 존중하고 기다려주는";
        }
    }
    
    // 월령 오행과의 상호작용
    if ((yearElement === "수" && monthElement === "목") || 
        (yearElement === "목" && monthElement === "화") ||
        (yearElement === "화" && monthElement === "토") ||
        (yearElement === "토" && monthElement === "금") ||
        (yearElement === "금" && monthElement === "수")) {
        loveStyle += ", 상대방과의 관계에서 시너지를 만들어내는";
    }
    
    return loveStyle + " 연애 스타일입니다";
}

/**
 * 대운 흐름 계산 함수
 * @param {string} zodiac - 띠
 * @param {string} element - 오행
 * @param {string} monthElement - 월령 오행
 * @param {string} gender - 성별
 * @returns {string} - 대운 흐름
 */
function calculateFortunePeriods(zodiac, element, monthElement, gender) {
    let result = "";
    
    // 20대 운세
    result += "<p>- 20대: ";
    if (["호랑이", "말", "개"].includes(zodiac)) {
        result += "자기 발견과 성장의 시기, 다양한 경험을 통해 자신의 강점 발견";
    } else if (["쥐", "용", "원숭이"].includes(zodiac)) {
        result += "학업과 경력 시작에 유리한 시기, 지적 성장이 두드러짐";
    } else if (["소", "뱀", "닭"].includes(zodiac)) {
        result += "신중한 계획과 준비가 필요한 시기, 안정적인 기반 구축";
    } else {
        result += "인간관계 형성이 중요한 시기, 귀인을 만날 확률이 높음";
    }
    result += "</p>";
    
    // 30대 운세
    result += "<p>- 30대: ";
    if (element === "화" || element === "금") {
        result += "커리어의 급성장과 사회적 인정을 받는 시기";
    } else if (element === "목" || element === "수") {
        result += "인간관계 확장 및 연애운 상승의 시기";
    } else {
        result += "안정적인 성장과 내실을 다지는 시기";
    }
    result += "</p>";
    
    // 40대 운세
    result += "<p>- 40대: ";
    if ((element === "화" && monthElement === "토") || (element === "토" && monthElement === "화")) {
        result += "재물운이 크게 상승하는 시기, 투자와 확장에 유리함";
    } else if ((element === "금" && monthElement === "수") || (element === "수" && monthElement === "금")) {
        result += "인덕이 쌓이고 인맥을 통한 기회가 많은 시기";
    } else {
        result += "재물 관리에 주의가 필요하며, 안정적인 투자가 중요한 시기";
    }
    result += "</p>";
    
    // 50대 운세
    result += "<p>- 50대: ";
    if (gender === "female") {
        if (["토끼", "양", "돼지"].includes(zodiac)) {
            result += "여성으로서 더욱 빛나는 시기, 지혜와 경험이 인정받음";
        } else {
            result += "귀인운 상승, 가족과 커리어의 조화를 이루는 시기";
        }
    } else {
        if (["호랑이", "용", "말"].includes(zodiac)) {
            result += "남성으로서 리더십이 더욱 빛나는 시기, 사회적 지위 상승";
        } else {
            result += "귀인운 상승, 직업과 사회적 영향력이 강화되는 시기";
        }
    }
    result += "</p>";
    
    return result;
}

// 결과 이미지 저장 기능
document.getElementById("saveImageBtn").addEventListener("click", function() {
    html2canvas(document.querySelector("#result")).then(canvas => {
        const link = document.createElement("a");
        link.download = "사주_매력살_분석.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
});

// 카카오톡 공유 기능
document.getElementById("kakaoShareBtn").addEventListener("click", function() {
    if (typeof Kakao !== 'undefined') {
        Kakao.Link.sendDefault({
            objectType: 'text',
            text: '나의 매력살 사주풀이 결과를 공유합니다!',
            link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href
            }
        });
    } else {
        alert("카카오톡 SDK가 로드되지 않았습니다. 카카오 API 키를 확인해주세요.");
    }
});

// 문자 공유 기능
document.getElementById("smsShareBtn").addEventListener("click", function() {
    const shareUrl = window.location.href;
    window.location.href = "sms:?body=" + encodeURIComponent("나의 매력살 사주풀이 결과: " + shareUrl);
});