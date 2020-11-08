import React, { Component } from 'react';
import IdolSearch from '../../components/page/idol-search'
import Page from '../../components/common/page'

class IdolSearchPage extends Component {
    static getInitialProps({ query }) {
        return { ...query }
    }
    render() {
        return (
            <Page>
                <IdolSearch />
            </Page>
        )
    }
}


export default IdolSearchPage;