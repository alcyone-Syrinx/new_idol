import React, { useState, useEffect, useMemo, useCallback } from 'react'
/* External imports */
import axios from 'axios'
import moment from 'moment'
import Router from 'next/router';

/* Internal imports */
import styles from './CardTrades.scss'
import GraphContainer2 from './GraphContainer2'
const CardTrades2 = (props) => {

    const { hash } = props
    const [cardName, setCardName] = useState('')
    const [cardTradeInfos, setCardTradeInfos] = useState([])
    const [beginTime, setBeginTime] = useState(moment().add("-30", "d").format('YYYY-MM-DD'))
    const [endTime, setEndTime] = useState(moment().format('YYYY-MM-DD'))
    const [idolCardsInfo, setIdolCardsInfo] = useState([])
    const [idolCardsView, setIdolCardsView] = useState('none')
    const [topPrice, setTopPrice] = useState(0)
    const [graphData, setGraphData] = useState([])

    useEffect(() => {
        getCardBasicInfo()
        callTradeApi()
    }, [hash])

    const getCardBasicInfo = async () => {
        try {
            const cardSearchResult = await axios.get(`http://localhost:3002/api/card-search?hash=${hash}`)
            getIdolCardsInfo(cardSearchResult?.data?.content[0].idolId)
            setCardName(cardSearchResult?.data?.content[0].name)
        } catch (error) {
            setCardName("조회실패")
            return ([])
        }
    }

    const getIdolCardsInfo = async (id) => {
        try {
            const cardSearchResult = await axios.get(`http://localhost:3002/api/card-search?id=${id}`)
            setIdolCardsInfo(cardSearchResult?.data?.content)
        } catch (error) {
            console.log(error)
            setIdolCardsInfo([])
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

        await transToGraphData()
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
        return itemType[val];
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

    const itemOnClick = (hash) => {
        Router.push({ pathname: `/card-trades/${hash}` })
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

    const renderCardList = (info) => {
        const { cardHash } = info;
        return (
            <li onClick={() => itemOnClick(cardHash)}>
                <img src={`https://imas.gamedbs.jp/cg/image_sp/card/xs/${cardHash}.jpg`} />
            </li>
        )
    }

    const transToGraphData = (eneDrink) => {
        if (eneDrink) {
            if (Number.isNaN(eneDrink)) return
        }
        let tradeDateList = []
        let dateTradeData = {}
        let dateCount = {}
        let top = 0;

        for (let i of cardTradeInfos) {

            if (tradeDateList.length > 29) {
                break
            }

            const { item } = i
            let price = 0;
            let itemInclude = false
            const tradeDate = i.tradeTime.split("T")[0]

            for (let i of item) {
                if (i.itemTypeId === 1) {
                    price += i.volume
                } else if (i.itemTypeId === 2) {
                    price += i.volume * (eneDrink || 1.5)
                } else {
                    itemInclude = true
                    break
                }
            }

            if (itemInclude) {
                continue
            }

            if (!tradeDateList.find(a => a === tradeDate)) {
                tradeDateList.push(tradeDate)
            }

            dateCount[tradeDate] = (dateCount[tradeDate] || 0) + 1
            dateTradeData[tradeDate] = (dateTradeData[tradeDate] || 0) + price
        }

        const result = tradeDateList.map(a => {
            const value = Math.round(dateTradeData[a] / dateCount[a])

            if (value > top) {
                top = value
            }

            return {
                date: a,
                value
            }
        })

        setTopPrice(topPrice)
        setGraphData(result || [])
    }

    return (
        <div className={styles.tradeContainer}>
            <div className={styles.header}>
                <label>{cardName}</label>
            </div>
            <div>
                <div className={styles.idolCardsContainer} >
                    <div className={styles.idolCardsHeader} onClick={() => dropDownTab('cards')}>
                        아이돌 리스트
                </div>
                    <div className={styles.idolCardsList} style={{ display: idolCardsView }}>
                        <ul >
                            {idolCardsInfo?.map(item => renderCardList(item))}
                        </ul>
                    </div>
                </div>
                <GraphContainer2
                    cardTradeInfos={cardTradeInfos}
                />
            </div>
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
        </div >
    )
}

CardTrades2.getInitialProps = ({ query }) => {
    return query;
}

export default CardTrades2
