
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

const searchCardApi = async (id) => {
    const cardSearchResult = await axios.get(`http://localhost:3002/api/card-search?id=${id}`)
    return cardSearchResult?.data.content || []
}

function* searchCategory() {
    const code = yield call(apiCodes)
    yield put(searchAction.updateCategory(code))
}

function* searchCardData(actParam) {
    try {
        delay(100)
        const imgArr = yield call(searchCardApi, actParam.id)
        console.log(imgArr)
        yield put(searchAction.updateImgData(imgArr))
        yield put(searchAction.updateLoadingDisplay('none'))
    } catch (error) {
        console.log(error)
    }
}

function* searchIdolData() {
    try {
        delay(100)
        console.log('??')
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