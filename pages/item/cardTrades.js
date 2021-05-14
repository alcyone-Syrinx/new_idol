/* External imports */
import React, { Component } from 'react'
import axios from 'axios'

/* Internal imports */
import Page from '../../components/common/page'
import CardTrades from '../../components/page/card-trades'
import NaveHeader from '../../components/common/component/navi-header'

class CardTradesPage extends Component {
    render() {
        const { hash } = this.props

        return (
            <Page>
                <NaveHeader />
                <CardTrades hash={hash} />
            </Page>
        )
    }
}

export default CardTradesPage
