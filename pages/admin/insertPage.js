/* External imports */
import React, { Component } from 'react'
import IdolSearch from '../../components/page/admin/InsertPage'

/* Internal imports */
import Page from '../../components/common/page'
import NaveHeader from '../../components/common/component/navi-header'

const InsertPage = () => {
    return (
        <Page>
            <NaveHeader />
            <IdolSearch />
        </Page>
    )
}

export default InsertPage
