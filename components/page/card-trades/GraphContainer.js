import React, { Component } from 'react'

/* Internal imports */
import styles from './CardTrades.scss'

class GraphContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            graphView: 'none',
            enebiyull: 1.5,
            viewCount: 30,
        }
    }

    dropDownTab = (flag) => {
        const { idolCardsView, graphView } = this.state

        if (flag === 'cards') {
            this.setState({ idolCardsView: idolCardsView === 'none' ? 'block' : 'none' })

        } else {
            this.setState({ graphView: graphView === 'none' ? 'block' : 'none' })

        }
    }

    transToGraphData = (cardTradeInfos, eneDrink) => {
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
                {result?.map(a => this.renderGraphItem(topPrice, a))}
            </ul>)
    }

    reCaculate = () => {
        const value = document?.getElementById('enedrink')?.value || 1.5
        this.setState({ enebiyull: value })
    }

    renderGraphItem = (topPrice, info) => {

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


    render() {
        const { graphView, enebiyull, viewCount } = this.state
        const { cardTradeInfos } = this.props

        return (
            <div className={styles.graphContainer} >
                <div className={styles.graphHeader} onClick={() => this.dropDownTab('graph')}>거래내역 그래프</div>
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
                            onClick={() => this.reCaculate(cardTradeInfos)}>확인</button>
                </div>
                <div className={styles.graphList} style={{ display: graphView }}>
                    {this.transToGraphData(cardTradeInfos, enebiyull)}
                </div>
            </div>
        )
    }

}

export default GraphContainer
