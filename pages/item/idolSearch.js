import React, { Component } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import List from '../../mapping';

class IdolSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idolData: [],
            imgData: [],
            value: ""
        }
    }

    async componentDidMount() {
        const idolData = await axios.get('http://localhost:3002/idolData');
        this.setState({ idolData: idolData.data.content });
    }

    onChange = (val) => {
        this.setState({ value: val.target.value })
    }

    onClick = async () => {
        const name = List(this.state.value);
        const idolInfo = name && this.state.idolData.filter(a => a.name === name);

        const id = idolInfo ? idolInfo[0].idolId : false;

        if (!id) {
            this.setState({ imgData: [] });
            return;
        }
        const idolData = await axios.get(`http://localhost:3002/idolCardList?id=${id}`);
        if (idolData) {
            const imgArr = idolData.data.content.map(a => {
                return (

                    <img src={`https://imas.gamedbs.jp/cg/image_sp/card/xs/${a.cardHash}.jpg`} />

                )
            })

            console.log(imgArr)
            this.setState({ imgData: imgArr })
        }
    }

    render() {
        return (
            <Layout>
                {this.props.title}
                <div>
                    검색:<input onChange={this.onChange}></input><button onClick={this.onClick}>확인</button>
                </div>
                {this.state.imgData}
            </Layout>
        )
    }
}

IdolSearch.getInitialProps = ({ query }) => {
    return query;
}

export default IdolSearch;