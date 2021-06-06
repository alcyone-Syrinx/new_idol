import React, { Component, useEffect } from 'react'
import styles from './IdolSearch.scss'
import { useDispatch, useSelector } from 'react-redux'
import action from '../../../store/action'
import SearchModal from './SearchModal'

const IdolSearch = () => {
    const disPatch = useDispatch()
    const state = useSelector(state => state.search)
    const {
        imgData,
        inputValue,
        loadingDisplay,
        idolColor,
    } = state

    useEffect(() => {
        const { searchAction } = action
        disPatch(searchAction.searchIdolData())
        disPatch(searchAction.codeApi())
    }, [])

    const onChange = (val) => {
        disPatch(action.searchAction.updateInputvalue(val.target.value))
    }

    const onClick = async () => {
        const { searchAction } = action
        disPatch(searchAction.updateImgData([]))
        disPatch(searchAction.updateLoadingDisplay('block'))
        disPatch(searchAction.searchCardData(inputValue))
    }

    const onEnterPress = (e) => {
        if (e.key === 'Enter') {
            onClick()
        }
    }

    const renderIdolCards = (val) => {
        const {
            ability_backmember,
            ability_effect,
            ability_name,
            ability_scope,
            ability_type,
            card_atk,
            card_def,
            card_hash,
            card_name,
            card_rare,
            db_backmember,
            db_scope,
            db_strength,
            db_type,
        } = val

        return (
            <li key={val.cardMobageId} className={styles.cardItems} onClick={() => itemOnClick(card_hash)}>
                <div className={styles.cardImgBox}>
                    <img src={`https://imas.gamedbs.jp/cg/image_sp/card/xs/${card_hash}.jpg`} />
                </div>
                <div className={styles.cardInfoBox}>
                    <ul>
                        <li>
                            카드명:{card_name}
                        </li>
                        <li>
                            레어리티:{card_rare}
                        </li>
                        <li>
                            특기: <label>{ability_effect && `[${ability_effect}]`}</label>{ability_scope}{ability_type}
                        </li>
                        <li>
                            백맴버: <label>{ability_backmember && `[${ability_effect}]`}</label>{ability_backmember && ability_scope}{ability_backmember}{ability_backmember && ability_type}
                        </li>
                        <li>
                            특기명 : {ability_name && ability_name}
                        </li>
                    </ul>
                </div>
                <div className={styles.cardInfoBox}>
                    <ul>
                        <li>
                            공격력:{card_atk}
                        </li>
                        <li>
                            수비력:{card_def}
                        </li>
                    </ul>
                </div>
            </li>
        )
    }

    const itemOnClick = (hash) => {
        location.href = `/card-trades/${hash}`
    }

    return (
        <div className={styles.searchBody}>
            <SearchModal />
            <div className={styles.inputBody}>
                <label>검색</label><input onChange={onChange} onKeyPress={onEnterPress} value={inputValue} />
            </div>
            <div className={styles.buttonContainer}>
                <button id={styles.submit} className={styles.submit} onClick={onClick}>확인</button>
            </div>
            <div className={styles.progress} style={{ display: loadingDisplay }}>
                <div className={styles.outer}>
                    <div className={styles.inner} style={{ background: idolColor }}></div>
                </div>
            </div>
            <div className={styles.contentContainer}>
                <ul className={styles.contentBody}>
                    {imgData?.map(item => renderIdolCards(item))}
                </ul>
            </div>

        </div>
    )
}

export default IdolSearch
