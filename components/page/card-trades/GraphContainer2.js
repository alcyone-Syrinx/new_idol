import React, { Component, useState, useEffect, useMemo, useCallback } from 'react'

/* Internal imports */
import styles from './CardTrades.scss'

const GraphContainer2 = (props) => {
    const { cardTradeInfos } = props

    useEffect(() => {
        console.log(cardTradeInfos)
    }, [cardTradeInfos])
    const [graphView, setGraphView] = useState('none')
    const [enebiyull, setEnebiyull] = useState(1.5)
    const [viewCount, setViewCount] = useState(30)

    const dropDownTab = (flag) => {
        setGraphView(graphView === 'none' ? 'block' : 'none')
    }
    const transToGraphData = useCallback((cardTradeInfos, eneDrink) => {
        console.log('why')
        if (!cardTradeInfos) return

        const reverseTradeDtaa = cardTradeInfos.reverse()

        if (eneDrink) {
            if (Number.isNaN(eneDrink)) return
        }

        let tradeDateList = []
        let dateTradeData = {}
        let dateCount = {}
        let topPrice = 0;

        for (let i of reverseTradeDtaa) {

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

            if (value > topPrice) {
                topPrice = value
            }

            return {
                date: a,
                value
            }
        })

        return (
            <ul>
                {result?.map(a => renderGraphItem(topPrice, a))}
            </ul>)

    }, [cardTradeInfos])


    const reCaculate = () => {
        const value = document?.getElementById('enedrink')?.value || 1.5
        setEnebiyull(value)
    }

    const renderGraphItem = (topPrice, info) => {

        const height = `${Math.ceil(info.value / topPrice * 100)}%`
        return (
            <li className={styles.graphContent}>
                <div className={styles.graphBar} style={{ height }} >
                    <div className={styles.graphValue}>{info.value}</div>
                    <div className={styles.graphHeight} />
                </div>
                <div className={styles.graphDate}>{info.date}</div>
            </li>
        )
    }

    const a = useMemo(() => transToGraphData(cardTradeInfos, enebiyull), [cardTradeInfos]);

    return (
        <div className={styles.graphContainer} >
            <div className={styles.graphHeader} onClick={() => dropDownTab('graph')}>거래내역 그래프</div>
            <div style={{ display: graphView }}>
                <div className={styles.inputBody}>
                    <div className={styles.inputContent}>
                        <label>에네드링배율</label>
                        <input id="enedrink" type="number" />
                    </div>
                    <div className={styles.inputContent}>
                        <label>최대갯수</label>
                        <input id="viewCount" type="number" />
                    </div>
                </div>
                <button id={styles.submit} className={styles.submit}
                    onClick={() => reCaculate(cardTradeInfos)}>확인</button>
            </div>
            <div className={styles.graphList} style={{ display: graphView }}>
                {a}
            </div>
        </div>
    )
}



GraphContainer2.getInitialProps = ({ query }) => {
    return query
}

export default GraphContainer2
