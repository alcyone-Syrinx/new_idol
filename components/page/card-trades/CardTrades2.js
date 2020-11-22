import React, { useState, useEffect, useMemo, useCallback } from 'react'
/* External imports */
import axios from 'axios'
import moment from 'moment'
import Router from 'next/router';

/* Internal imports */
import styles from './CardTrades.scss'
import GraphContainer2 from './GraphContainer2'
import LoaderContainer from '../../common/component/loader-container/LoaderContainer'
import CardList from './CardList/CardList';

const CardTrades2 = ({ hash }) => {
    const [loading, setLoading] = useState(true)
    const [idolId, setIdolId] = useState()

    const [showCardList, setShowCardList] = useState(false)
    const [showTradeChart, setShowTradeChart] = useState(false)

    const [cardName, setCardName] = useState('')
    const [cardTradeInfos, setCardTradeInfos] = useState([])
    const [beginTime, setBeginTime] = useState(moment().add("-30", "d").format('YYYY-MM-DD'))
    const [endTime, setEndTime] = useState(moment().format('YYYY-MM-DD'))
    const [idolCardsView, setIdolCardsView] = useState('none')

    useEffect(() => {
        getCardBasicInfo()
        callTradeApi()
    }, [hash])

    const getCardBasicInfo = async () => {
        try {
            const cardSearchResult = await axios.get(`http://localhost:3002/api/card-search?hash=${hash}`)

            setIdolId(cardSearchResult?.data?.content?.[0].idolId)
            setCardName(cardSearchResult?.data?.content[0].name)

            setLoading(false)
        } catch (error) {
            setCardName("조회실패")
            setLoading(false)
        }
    }

    const setBeginDates = async (date) => {
        const inputBeginTime = date.target.value

        if (inputBeginTime > endTime) {
            return
        }

        await setBeginTime(beginTime)
    }

    const setEndDates = async (date) => {
        const inputEndTime = date.target.value

        if (beginTime > inputEndTime) {
            return
        }

        await setEndTime(endTime)
    }

    const callTradeApi = async () => {
        const body = {
            beginTime: `${beginTime}T00:00:00`,
            endTime: `${endTime}T00:00:00`
        }

        try {
            const response = await axios.post(`/api/card-trades/${hash}`, body)
            setCardTradeInfos(response?.data?.content || [])
        } catch (error) {
            setCardTradeInfos([])
        }
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

    const dropDownTab = () => {
        setIdolCardsView(idolCardsView === 'none' ? 'block' : 'none')
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
                <div onClick={() => setShowCardList(!showCardList)}>아이돌 리스트</div>
                { showCardList ? <CardList idolId={idolId} /> : null }
            </div>
        </div>
    ), [showCardList, idolId])

    const renderTradeChart = useCallback(() => (
        <div className={styles.idolCardsContainer}>
            <div className={styles.idolCardsHeader}>
                <div onClick={() => setShowTradeChart(!showTradeChart)}>거래내역 차트</div>
                { showTradeChart ? <GraphContainer2 trades={cardTradeInfos} /> : null }
            </div>
        </div>
    ), [showTradeChart, cardTradeInfos])

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
                        <button id={styles.submit} className={styles.submit} onClick={callTradeApi}>확인</button>
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
