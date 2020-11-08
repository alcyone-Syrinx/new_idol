const charNameTransData = {
    "미즈모토유카리": "水本ゆかり",
    "미야모토후레데리카": "宮本ﾌﾚﾃﾞﾘｶ",
    "사토신": "佐藤心",
    "시부야린": "渋谷凛",
};

const effectScopeTransData = {
    Unknown: "알수없음",
    All: "전속성",
    Cute: "큐트",
    Cool: "쿨",
    Passion: "패션",
    CuteCool: "큐트&쿨",
    CutePassion: "큐트&패션",
    CoolPassion: "쿨&패션",
    Self: "자신",
};

const effectBackMemberScope = {
    "None": "",
    "One": "상위1명",
    "OneToTwo": "상위1~2명",
    "Two": "상위2명",
    "TwoToThree": "상위2~3먕",
    "Three": "상위3명",
    "ThreeToFour": "상위3~4명",
    "Four": "상위4명",
    "FourToFive": "상위4~5명",
    "Five": "상위5명",
    "Ten": "상위10명",
};

const effectType = {
    "Unknown": "",
    "AttackBuff": "공격업",
    "AttackDebuff": "공격다운",
    "DefenceBuff": "수비업",
    "DefenceDebuff": "수비다운",
    "AttackDefenceBuff": "공격&수비업",
    "AttackDefenceDebuff": "공격&수비다운"
}

const effectStrength = {
    "Unknown": "",
    "Gokusho": "극소",
    "RandomGokushoSho": "극소~소",
    "Sho": "소",
    "RandomShoChu": "소~중",
    "Chu": "중",
    "RandomChuDai": "중~대",
    "Dai": "대",
    "RandomDaiTokudai": "대~특대",
    "Tokudai": "특대",
    "RandomTokudaiGokudai": "특대~극대",
    "Gokudai": "극대",
    "RandomGokudaiZetsudai": "극대~절대",
    "Zetsudai": "절대",
    "RandomZetsudaiChozetsu": "절대~초절",
    "Chozetsu": "초절",
    "RandomChozetsuKyukyoku": "초절~궁극",
    "Kyukyoku": "궁극"
}

const searchIdolName = (val) => {
    const value = val.replace(/(\s*)/g, "");
    return charNameTransData[value];
}

const convertCategoryCode = (categoryName, codeValue) => {

    switch (categoryName) {
        case 'EffectScope':
            return effectScopeTransData[codeValue]
        case 'EffectBackMemberScope':
            return effectBackMemberScope[codeValue]
        case 'EffectType':
            return effectType[codeValue]
        case 'EffectStrength':
            return effectStrength[codeValue];
        default:
            return;
    }

}


export default { searchIdolName, convertCategoryCode };