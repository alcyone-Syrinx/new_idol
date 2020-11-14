/* External imports */
import React, { Component } from 'react'
import axios from 'axios'
import autobind from 'autobind-decorator'
import moment from 'moment'
import Router from 'next/router';


/* Internal imports */
import styles from './CardTrades.scss'

class CardTrades extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hash: '',
            cardName: '로드 중...',
            cardTradeInfos: [],
            beginTime: '',
            endTime: '',
            cardBasicData: '',
            idolCardsInfo: [],
            idolCardsView: 'none',
            graphData: {},
        }
    }

    async componentDidMount() {
        const { hash } = this.props
        await this.setState({ hash })
        await this.getCardBasicInfo()
        await this.getIdolCardsInfo()
        await this.getCardTradData()
        await this.transToGraphData()
    }

    getCardBasicInfo = async () => {
        const { hash } = this.props

        try {
            const cardSearchResult = await axios.get(`http://localhost:3002/api/card-search?hash=${hash}`)
            this.setState({ cardName: cardSearchResult?.data?.content[0].name, idolId: cardSearchResult?.data?.content[0].idolId })
        } catch (error) {
            this.setState({ cardName: '조회실패' })

        }
    }



    getIdolCardsInfo = async () => {
        const { idolId } = this.state

        try {
            const cardSearchResult = await axios.get(`http://localhost:3002/api/card-search?id=${idolId}`)
            this.setState({ idolCardsInfo: cardSearchResult?.data?.content })
        } catch (error) {
            this.setState({ idolCardsInfo: [] })

        }
    }

    setBeginDate = async (date) => {
        const beginTime = date.target.value
        const { endTime } = this.state

        if (beginTime > endTime) {
            return
        }

        await this.setState({ beginTime })
    }

    setEndDate = async (date) => {
        const endTime = date.target.value
        const { beginTime } = this.state

        if (beginTime > endTime) {
            return
        }

        this.setState({ endTime })

    }

    getCardTradData = async () => {
        const stateEndTime = moment().format('YYYY-MM-DD')
        const stateBeginTime = moment().add("-30", "d").format('YYYY-MM-DD')

        await this.setState({ beginTime: stateBeginTime, endTime: stateEndTime })
        await this.callTradeApi()
    }

    callTradeApi = async () => {

        const { beginTime, endTime, hash } = this.state
        const body = {
            beginTime: `${beginTime}T00:00:00`,
            endTime: `${endTime}T00:00:00`
        }

        try {
            this.setState({ cardTradeInfos: [] })
            const response = await axios.post(`/api/card-trades/${hash}`, body)
            this.setState({ cardTradeInfos: response?.data?.content || [] })
        } catch (error) {
            this.setState({ cardTradeInfos: [] })
        }
    }

    transToGraphData = () => {
        let form = {};
        const { cardTradeInfos } = this.state

        let dateContent = []
        let dateTradeData = {}
        let dateCount = {}

        for (let i of cardTradeInfos) {

            if (dateContent.length > 30) {
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
                    price += i.volume * 1.5
                } else {
                    itemInclude = true
                    break
                }
            }

            if(itemInclude) {
                continue
            }

            if (!dateContent.find(a => a === tradeDate)) {
                dateContent.push(tradeDate)
            }

            dateCount[tradeDate] = (dateCount[tradeDate] || 0) + 1
            dateTradeData[tradeDate] = (dateTradeData[tradeDate] || 0) + price
        }

        this.setState({
            graphData: {
                dateList: dateContent,
                dateTradeDate: dateContent.map(a => {
                    return { [a]: dateTradeData[a] / dateCount[a] }
                })
            }
        })

        console.log(this.state.graphData)
    }


    convertDate(val) {
        const firstSplit = val.split("T");
        const seconedSplit = firstSplit[1].split("+");

        const yyyyMMdd = firstSplit[0].split("-")
        const hhMMss = seconedSplit[0].split(":")

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

    idolCardsTabClick = () => {
        const { idolCardsView } = this.state
        this.setState({ idolCardsView: idolCardsView === 'none' ? 'block' : 'none' })
    }

    itemOnClick = (hash) => {
        Router.push({ pathname: `/card-trades/${hash}` })
    }

    @autobind
    renderItems(info) {
        return (
            <li className={styles.cardItems}>
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
            </li>

        )
    }

    renderCardList = (info) => {
        const { cardHash } = info;
        return (
            <li onClick={() => this.itemOnClick(cardHash)}>
                <img src={`https://imas.gamedbs.jp/cg/image_sp/card/xs/${cardHash}.jpg`} />
            </li>
        )
    }

    render() {
        const {
            cardName,
            cardTradeInfos,
            beginTime, endTime,
            idolCardsView,
            idolCardsInfo
        } = this.state
        return (
            <div className={styles.tradeContainer}>
                <div className={styles.header}>
                    <label>{cardName}</label>
                </div>
                <div>
                    <div className={styles.idolCardsContainer} >
                        <div className={styles.idolCardsHeader} onClick={this.idolCardsTabClick}>
                            아이돌 리스트
                        </div>
                        <div className={styles.idolCardsList} style={{ display: idolCardsView }}>
                            <ul >
                                {idolCardsInfo?.map(item => this.renderCardList(item))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.inputBody} >
                    <div className={styles.inputDate}>
                        <input type="date" onChange={this.setBeginDate} value={beginTime} />
                    </div>
                    <div className={styles.inputDate}>
                        <input type="date" onChange={this.setEndDate} value={endTime} />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button id={styles.submit} className={styles.submit} onClick={this.callTradeApi}>확인</button>
                    </div>
                </div>
                <div>
                    <ul className={styles.cardListContainer}>
                        {cardTradeInfos.map(this.renderItems)}
                    </ul>
                </div>
            </div >
        )
    }
}

export default CardTrades
