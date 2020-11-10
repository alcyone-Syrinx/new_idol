import React, { Component } from 'react';
import IdolSearch from '../../components/page/idol-search'
import Page from '../../components/common/page'
import NaveHeader from '../../components/common/component/navi-header'

class IdolSearchPage extends Component {
    static getInitialProps({ query }) {
        return { ...query }
    }
    render() {
        return (
            <Page>
                <NaveHeader />
                <IdolSearch />
            </Page>
        )
    }
}


export default IdolSearchPage;