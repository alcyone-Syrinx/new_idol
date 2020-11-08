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

const searchIdolName = (val) => {
    const value = val.replace(/(\s*)/g, "");
    return charNameTransData[value];
}

const convertCategoryCode = (category, categoryName) => {

    switch (category) {
        case 'EffectScope':
            return effectScopeTransData[categoryName]
        default:
            return;
    }

}


export default { searchIdolName, convertCategoryCode };