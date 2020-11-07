/* External imports */
import React, { Component } from 'react'
import axios from 'axios'
import autobind from 'autobind-decorator'

/* Internal imports */
import styles from './CardTrades.scss'

class CardTrades extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cardName: '로드 중...',
            cardTradeInfos: [],
        }
    }

    async componentDidMount() {
        const { hash } = this.props

        try {
            const response = await axios.get(`/api/card-trades/${hash}`)
            this.setState({
                cardName: response?.data?.content?.[0]?.cardName || '정보 없음',
                cardTradeInfos: response?.data?.content || []
            })
        } catch (error) {
            this.setState({ cardTradeInfos: [] })
        }
    }

    convertDate(val) {
        const firstSplit = val.split("T");
        const seconedSplit = firstSplit[1].split("+");

        const yyyyMMdd = firstSplit[0].split("-");
        const hhMMss = seconedSplit[0].split(":");

        return (`${yyyyMMdd[0]}년 ${yyyyMMdd[1]}월 ${yyyyMMdd[2]}일 ${hhMMss[0]}시 ${hhMMss[1]}분 ${hhMMss[2]}초`)
    }

    getItemType(val) {
        const itemType = {
            1: `스태미너 드링크`,
            2: `에너지 드링크`,
            3: `옷장 열쇠`,
            11: `매니`,
            21: `카드`
        }
        return itemType[val];
    }

    getCostMessage(items) {
        return items.map(item => {
            if (item.cardName) {
              return item.cardName
            } else {
              return `${item.volume} ${this.getItemType(item.itemTypeId)}`
            }
        }).join(', ')
    }

    @autobind
    renderItems(info) {
        return (
            <div key={info.mobageTradeHistoryDetailId} className={styles.cardContainer}>
                <div className={styles.tradeCost}>
                    {this.getCostMessage(info.item)}
                </div>
                <div className={styles.tradeInfo}>
                    <div className={styles.tradeNames}>
                        {`${info.sourceProducerName} -> ${info.destProducerName}`}
                    </div>
                    <div className={styles.tradeTime}>
                        {`${this.convertDate(info.tradeTime)}`}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { cardName, cardTradeInfos } = this.state
        return (
            <dik>
              <div className={styles.header}>
                {cardName}
              </div>
              <div>
                {cardTradeInfos.map(this.renderItems)}
              </div>
            </dik>
        )
    }
}

export default CardTrades
