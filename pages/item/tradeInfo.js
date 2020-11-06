import React, { Component } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';

class TradeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardTradeInfo: []
        }
    }


    async componentDidMount() {
        const { hash } = this.props;
        try {
            const tradeInfo = await axios.get(`/card-trade-info?hash=${hash}`);

            if (tradeInfo) {
                const { content } = tradeInfo.data;
                this.setState({
                    cardTradeInfo: content.length > 0 ?
                        content.map(a => {
                            return (<li className="item-content">
                                <div>
                                    <div>
                                        판매자 : {a.sourceProducerName}
                                    </div>
                                    <div>
                                        구매자 :{a.destProducerName}
                                    </div>
                                    <div>
                                        거래일 : {this.convertDate(a.tradeTime)}
                                    </div>
                                    품목 :
                                    {a.item && a.item.map(b => {
                                        const itemName = this.getItemType(b.itemTypeId);
                                        return <div>
                                            {b.itemTypeId === 21 && <img src={`https://imas.gamedbs.jp/cg/image_sp/card/xs/${b.cardHash}.jpg`} />}
                                            <div>{`${itemName}: ${b.itemTypeId !== 21 ? b.volume : b.cardName}`}</div>
                                        </div>
                                    })}
                                </div>
                            </li>);
                        }) : []
                })

            } else {
                this.setState({ cardTradeInfo: [] })
            }
        } catch (error) {
            this.setState({ cardTradeInfo: [] })

        }
    }

    convertDate = (val) => {
        const firstSplit = val.split("T");
        const seconedSplit = firstSplit[1].split("+");

        const yyyyMMdd = firstSplit[0].split("-");
        const hhMMss = seconedSplit[0].split(":");

        return (`${yyyyMMdd[0]}년 ${yyyyMMdd[1]}월 ${yyyyMMdd[2]}일 ${hhMMss[0]}시 ${hhMMss[1]}분 ${hhMMss[2]}초`)
    }

    getItemType = (val) => {
        const itemType = {
            1: `스태미너 드링크`,
            2: `에너지 드링크`,
            3: `옷장 열쇠`,
            11: `매니`,
            21: `카드`
        }

        return itemType[val];
    }

    render() {
        const { cardTradeInfo } = this.state
        return (
            <Layout>
                <ul className="item-body">{cardTradeInfo}</ul>
            </Layout>
        )
    }
}

TradeInfo.getInitialProps = ({ query }) => {
    return query;
}

export default TradeInfo;