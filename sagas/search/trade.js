
import { all, fork, takeLatest, call, put, delay, take, select } from "redux-saga/effects";
import axios from "axios";
import actions from "../../store/action";

const { tradeAction } = actions

const searchCardInfoByHash = async (hash) => {
    const cardSearchResult = await axios.get(`http://localhost:3002/api/card-search?hash=${hash}`)
    return cardSearchResult?.data.content
}

const searchCardTradeInfoByHash = async (hash, body) => {
    const cardSearchResult = await axios.post(`/api/card-trades/${hash}`, body)
    return cardSearchResult
}

function* findCardBasicInfo(action) {
    const { payload } = action
    const { hash } = payload
    const state = yield select(state => state.trade)
    const { cardInfo, displayHandler } = state

    try {
        delay(100)
        const cardBasicInfo = yield call(searchCardInfoByHash, hash)
        yield put(tradeAction.updateIdolId(cardBasicInfo && cardBasicInfo[0]?.idolId))
        yield put(tradeAction.updateCardInfo({ ...cardInfo, cardName: cardBasicInfo?.data?.content[0].name }))
        yield put(tradeAction.updateDisplayHandler({ ...displayHandler, loading: false }))
        console.log(displayHandler)
    } catch (error) {
        console.log(error)
        yield put(tradeAction.updateCardInfo({ ...cardInfo, cardName: '조회실패' }))
        yield put(tradeAction.updateDisplayHandler({ ...displayHandler, loading: false }))
    }
}

function* findCardTradeInfo(action) {
    const { payload } = action
    const { hash } = payload
    const state = yield select(state => state.trade)
    const { cardInfo, tradeTimes } = state
    const { beginTime, endTime } = tradeTimes

    try {
        delay(100)
        const body = {
            beginTime: `${beginTime}T00:00:00`,
            endTime: `${endTime}T00:00:00`
        }
        const tradeInfos = yield call(searchCardTradeInfoByHash, hash, body)
        yield put(tradeAction.updateCardInfo({ ...cardInfo, cardTradeInfos: tradeInfos?.data?.content || [] }))
    } catch (error) {
        console.log(error)
    }
}

export default function* tradeSaga() {
    yield all([
        takeLatest(tradeAction.GET_CARD_BASIC_INFO, findCardBasicInfo),
        takeLatest(tradeAction.GET_CARD_TRADE_INFO, findCardTradeInfo)
    ])
}