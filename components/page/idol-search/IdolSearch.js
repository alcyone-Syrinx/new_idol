import React, { Component } from 'react';
import axios from 'axios';
import searchIdolName from '../../../mapping';
import Router from 'next/router';
import styles from './IdolSearch.scss';

class IdolSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idolData: [],
            imgData: [],
            inputValue: "",
            loadingDisplay: 'none',
            idolColor: '',

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
        const idolInfo = name && idolData?.filter(a => a.name === name)
        if (!idolInfo) {
            return
        }

        const { classification } = idolInfo[0];

        this.setState({ idolColor: this.getClassColor(classification) })


        const id = idolInfo ? idolInfo[0].idolId : false;

        if (!id) {
            this.setState({ imgData: [] })
            return
        }

        this.setState({ imgData: [], loadingDisplay: 'block' });

        const cardSearchResult = await axios.get(`http://localhost:3002/idolCardList?id=${id}`)

        const imgArr = cardSearchResult?.data.content || [];
        this.setState({ imgData: imgArr, loadingDisplay: 'none' })

    }

    onEnterPress = (e) => {
        if (e.key === 'Enter') {
            this.onClick();
        }
    }

    renderIdolCards = (val) => {
        console.log(this.state)
        const { idolColor } = this.state
        const { cardHash, name } = val

        return (
            <li key={val.cardMobageId} className={styles.cardContainer} onClick={() => this.itemOnClick(cardHash)}>
                <div >
                    <img src={`https://imas.gamedbs.jp/cg/image_sp/card/xs/${cardHash}.jpg`} />
                    <div style={{ color: idolColor }}>
                        카드명:{name}
                    </div>
                </div>
            </li>
        )
    }

    itemOnClick = (hash) => {
        Router.push({ pathname: `/card-trades/${hash}` })
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

        return (
            <>
                <div>
                    검색:<input onChange={this.onChange} onKeyPress={this.onEnterPress} value={inputValue}></input><button onClick={this.onClick}>확인</button>
                </div>
                <div className="progress" style={{ display: loadingDisplay }}>
                    <div className="outer">
                        <div className="inner"></div>
                    </div>
                </div>
                <ul className="item-body">
                    {imgData?.map(item => this.renderIdolCards(item))}
                </ul>
            </>
        )
    }
}

export default IdolSearch;