import React, { Component } from 'react';
import Layout from '../components/Layout';

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                {this.props.title}
                basic page
                commit test
            </Layout>
        )
    }
}

Index.getInitialProps = ({ query }) => {
    return query;
}

export default Index;