const charNameTransData = {
    "미즈모토유카리": "水本ゆかり",
    "미야모토후레데리카": "宮本ﾌﾚﾃﾞﾘｶ",
    "사토신": "佐藤心",
    "시부야린": "渋谷凛",
};

const searchIdolName = (val) => {
    const value = val.replace(/(\s*)/g, "");
    return charNameTransData[value];
}


export default searchIdolName;