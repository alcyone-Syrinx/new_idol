import React, { Component } from 'react';
import Layout from '../../components/Layout';

class IdolSearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                {this.props.title}
            
            </Layout>
        )
    }
}

IdolSearch.getInitialProps = ({ query }) => {
    return query;
}

export default IdolSearch;