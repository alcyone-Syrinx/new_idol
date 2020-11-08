/* External imports */
import React, { Component } from 'react'
import axios from 'axios'

/* Internal imports */
import Page from '../../components/common/page'
import CardTrades from '../../components/page/card-trades'

class CardTradesPage extends Component {
    static getInitialProps({ query }) {
        return { ...query }
    }

    render() {
        const { hash } = this.props

        return (
            <Page>
                <CardTrades hash={hash} />
            </Page>
        )
    }
}

export default CardTradesPage
