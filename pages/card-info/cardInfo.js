/* External imports */
import React, { Component } from 'react'

/* Internal imports */
import Page from '../../components/common/page'
import CardInfo from '../../components/page/card-info'
import NaveHeader from '../../components/common/component/navi-header'

const CardInfoPage = ({ hash }) => {

    return (
        <Page>
            <NaveHeader />
            <CardInfo hash={hash} />
        </Page>
    )
}

export default CardInfoPage
