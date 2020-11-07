import React, { Component } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import searchIdolName from '../../mapping';
import Router from 'next/router';

class IdolSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idolData: [],
            imgData: [],
            inputValue: "",
            loadingDisplay: 'none'
        }
    }

    async componentDidMount() {
        const idolData = await axios.get('http://localhost:3002/api/idols');
        this.setState({ idolData: idolData.data.content });
    }

    onChange = (val) => {
        this.setState({ inputValue: val.target.value })
    }

    onClick = async () => {
        const { inputValue, idolData } = this.state;
        const name = searchIdolName(inputValue);
        const idolInfo = name && idolData.filter(a => a.name === name);
        console.log(idolData);
        if (!idolInfo) {
            return;
        }

        const { classification } = idolInfo[0];

        let classColor = this.getClassColor(classification);


        const id = idolInfo ? idolInfo[0].idolId : false;

        if (!id) {
            this.setState({ imgData: [] });
            return;
        }

        this.setState({ imgData: [], loadingDisplay: 'block' });

        const cardSearchResult = await axios.get(`http://localhost:3002/idolCardList?id=${id}`);
        if (cardSearchResult) {
            const imgArr = cardSearchResult.data.content.map(a => {
                return (
                    <li className="item-content" onClick={() => this.itemOnClick(a.cardHash)}>
                        <div >
                            <img src={`https://imas.gamedbs.jp/cg/image_sp/card/xs/${a.cardHash}.jpg`} />
                            <div style={{ color: classColor }}>
                                카드명:{a.name}
                            </div>
                        </div>
                    </li>
                )
            })
            this.setState({ imgData: imgArr, loadingDisplay: 'none' })
        }
    }

    itemOnClick = (hash) => {
        Router.push({ pathname: `/card-trades/${hash}`})
    }

    getClassColor = (val) => {
        switch (val) {
            case "Cute":
                return "#ff50ff";
            case "Cool":
                return "081cd1";
            case "Passion":
                return "#d38219";
            default:
                return "080808";
        }
    }

    render() {
        const { imgData, loadingDisplay, inputValue } = this.state;
        const { title } = this.props;
        return (
            <Layout>
                {title}
                <div>
                    검색:<input onChange={this.onChange} value={inputValue}></input><button onClick={this.onClick}>확인</button>
                </div>
                <div className="progress" style={{ display: loadingDisplay }}>
                    <div className="outer">
                        <div className="inner"></div>
                    </div>
                </div>
                <ul className="item-body">
                    {imgData}
                </ul>
            </Layout >
        )
    }
}

IdolSearch.getInitialProps = async ({ query }) => {
    // try {
    //     const idolData = await axios.get('http://localhost:3002/api/idols');
    //     return { ...query, idolData: idolData.data.content };
    // } catch (err) {
    //     return query;
    // }
    return query;
}

export default IdolSearch;