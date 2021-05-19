
import { all, fork, takeLatest, call, put, delay, take } from "redux-saga/effects";
import axios from "axios";
import actions from "../../store/action";

const { searchAction } = actions

const searchIdolDataApi = async () => {
    const idolData = await axios.get('http://localhost:3002/api/idols')
    return idolData?.data.content
}

const apiCodes = async () => {
    try {
        const idolData = await axios.get('http://localhost:3002/api/category/codes');
        return (idolData?.data.content);
    } catch (error) {
        return false;
    }
}

const searchCardApi = async (inputValue) => {
    const result = await axios.get(`/query/translations/findCodeByName?name=${inputValue}`).then(rst => rst.data)
    if (result.length === 0) {
        return;
    }

    const { idol_id } = result[0]
    const cardSearchResult = await axios.get(`http://localhost:3002/query/raw/findCardData?idol_id=${idol_id}`)
    return cardSearchResult?.data || []
}

function* searchCategory() {
    const code = yield call(apiCodes)
    yield put(searchAction.updateCategory(code))
}

function* searchCardData(actParam) {
    try {
        delay(100)
        const imgArr = yield call(searchCardApi, actParam.inputValue)
        yield put(searchAction.updateImgData(imgArr))
        yield put(searchAction.updateLoadingDisplay('none'))
    } catch (error) {
        console.log(error)
    }
}

function* searchIdolData() {
    try {
        delay(100)
        const imgArr = yield call(searchIdolDataApi)
        yield put(searchAction.updateIdolData(imgArr))
    } catch (error) {
        console.log(error)
    }
}

export default function* searchsaga() {
    yield all([
        takeLatest(searchAction.SEARCH_CARD_DATA, searchCardData),
        takeLatest(searchAction.SEARCH_IDOL_DATA, searchIdolData),
        takeLatest(searchAction.CODE_API, searchCategory)
    ])
}