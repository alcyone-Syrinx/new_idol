import React, { useEffect, useCallback } from 'react'
/* Internal imports */
import styles from './CardTrades.scss'
import GraphContainer from './GraphContainer'
import LoaderContainer from '../../common/component/loader-container/LoaderContainer'
import CardList from './CardList/CardList';
import { useDispatch, useSelector } from 'react-redux';
import action from '../../../store/action'

const CardTrades2 = ({ hash }) => {
    const disPatch = useDispatch()
    const { tradeAction } = action
    const state = useSelector(state => state.trade)
    const {
        idolId,
        displayHandler,
        cardInfo,
        tradeTimes
    } = state
    const {
        loading,
        showCardList,
        showTradeChart
    } = displayHandler
    const {
        cardName,
        cardTradeInfos
    } = cardInfo
    const {
        beginTime,
        endTime
    } = tradeTimes

    useEffect(() => {
        disPatch(tradeAction.getCardBasicInfo(hash))
        disPatch(tradeAction.getCardTradeInfo(hash))
    }, [])

    const setBeginDates = async (date) => {
        const inputBeginTime = date.target.value
        if (inputBeginTime > endTime) {
            return
        }
        await disPatch(tradeAction.updateTradeTimes({ ...tradeTimes, beginTime: inputBeginTime }))
    }

    const setEndDates = async (date) => {
        const inputEndTime = date.target.value
        if (beginTime > inputEndTime) {
            return
        }
        await disPatch(tradeAction.updateTradeTimes({ ...tradeTimes, endTime: inputEndTime }))
    }

    const convertDate = (val) => {
        const firstSplit = val.split("T");
        const seconedSplit = firstSplit[1].split("+");

        const yyyyMMdd = firstSplit[0].split("-")
        const hhMMss = seconedSplit[0].split(":")

        return (`${yyyyMMdd[0]}년 ${yyyyMMdd[1]}월 ${yyyyMMdd[2]}일 ${hhMMss[0]}시 ${hhMMss[1]}분 ${hhMMss[2]}초`)
    }

    const getItemType = (val) => {
        const itemType = {
            1: `스태미너 드링크`,
            2: `에너지 드링크`,
            3: `옷장 열쇠`,
            11: `매니`,
            21: `카드`
        }
        return itemType[val]
    }

    const getCostMessage = (items) => {
        return items.map(item => {
            if (item.cardName) {
                return item.cardName
            } else {
                return `${item.volume} ${getItemType(item.itemTypeId)}`
            }
        }).join(', ')
    }

    const renderItems = (info) => {
        return (
            <li className={styles.cardItems}>
                <div key={info.mobageTradeHistoryDetailId} className={styles.cardContainer}>
                    <div className={styles.tradeCost}>
                        {getCostMessage(info.item)}
                    </div>
                    <div className={styles.tradeInfo}>
                        <div className={styles.tradeNames}>
                            {`${info.sourceProducerName} -> ${info.destProducerName}`}
                        </div>
                        <div className={styles.tradeTime}>
                            {`${convertDate(info.tradeTime)}`}
                        </div>
                    </div>
                </div>
            </li>
        )
    }

    const renderCardList = useCallback(() => (
        <div className={styles.idolCardsContainer}>
            <div className={styles.idolCardsHeader}>
                <div onClick={() => disPatch(tradeAction.updateDisplayHandler({
                    ...displayHandler,
                    showCardList: !showCardList,
                }))}> 아이돌 리스트</div>
                {showCardList ? <CardList idolId={idolId} /> : null}
            </div>
        </div>
    ), [displayHandler, idolId])

    const renderTradeChart = useCallback(() => (
        <div className={styles.idolCardsContainer}>
            <div className={styles.idolCardsHeader}>
                <div onClick={() => disPatch(tradeAction.updateDisplayHandler({
                    ...displayHandler,
                    showTradeChart: !showTradeChart
                }))}>거래내역 차트</div>
                {showTradeChart ? <GraphContainer trades={cardTradeInfos} /> : null}
            </div>
        </div>
    ), [displayHandler, cardTradeInfos])

    return (
        <LoaderContainer loading={loading}>
            <div className={styles.tradeContainer}>
                <div className={styles.header}>
                    <label>{cardName}</label>
                </div>
                {renderCardList()}
                {renderTradeChart()}
                <div className={styles.inputBody} >
                    <div className={styles.inputDate}>
                        <input type="date" onChange={setBeginDates} value={beginTime} />
                    </div>
                    <div className={styles.inputDate}>
                        <input type="date" onChange={setEndDates} value={endTime} />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button id={styles.submit} className={styles.submit} onClick={() => disPatch(tradeAction.getCardTradeInfo(hash))}>확인</button>
                    </div>
                </div>
                <div>
                    <ul className={styles.cardListContainer}>
                        {cardTradeInfos?.map(renderItems)}
                    </ul>
                </div>
            </div>
        </LoaderContainer>
    )
}

export default CardTrades2
