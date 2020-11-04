const arr = {
    "미즈모토유카리": "水本ゆかり",
    "미야모토후레데리카": "宮本ﾌﾚﾃﾞﾘｶ",
    "사토신": "佐藤心"
};

const LIst = (val) => {
    const value = val.replace(/(\s*)/g, "");
    return arr[value];
}


export default LIst;