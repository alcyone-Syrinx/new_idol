import React, { Component, useEffect } from 'react'
import mapping from '../../../mapping'
import styles from './IdolSearch.scss'
import { useDispatch, useSelector } from 'react-redux'
import action from '../../../store/action'

const IdolSearch = () => {
    const disPatch = useDispatch()
    const state = useSelector(state => state.search)
    const {
        idolData,
        imgData,
        inputValue,
        loadingDisplay,
        idolColor,
        codeCategory,
    } = state


    const getClassColor = (val) => {
        switch (val) {
            case "Cute":
                return "#ff50ff"
            case "Cool":
                return "#081cd1"
            case "Passion":
                return "#d38219"
            default:
                return "080808"
        }
    }

    useEffect(() => {
        const { searchAction } = action
        disPatch(searchAction.searchIdolData())
        disPatch(searchAction.codeApi())
    }, [])

    const getCardEffectInfo = (categoryName, codeValue) => {
        const data = codeCategory.filter(a => a.categoryKey === categoryName)[0]?.detail?.filter(item => item.codeValue === codeValue)[0] || []
        return mapping.convertCategoryCode(categoryName, data.stringValue)
    }

    const onChange = (val) => {
        disPatch(action.searchAction.updateInputvalue(val.target.value))
    }

    const onClick = async () => {
        const { searchAction } = action
        const name = mapping.searchIdolName(inputValue)
        const idolInfo = name && idolData?.filter(a => a.name === name)
        console.log(idolInfo)
        if (!idolInfo || idolInfo.length === 0) {
            return
        }

        const { classification } = idolInfo[0]
        disPatch(searchAction.updateIdolColor(getClassColor(classification)))
        const id = idolInfo ? idolInfo[0].idolId : false

        if (!id) {
            disPatch(searchAction.updateImgData([]))
            return
        }
        disPatch(searchAction.updateImgData([]))
        disPatch(searchAction.updateLoadingDisplay('block'))
        disPatch(searchAction.searchCardData(id))
    }


    const onEnterPress = (e) => {
        if (e.key === 'Enter') {
            onClick()
        }
    }

    const renderIdolCards = (val) => {
        const { cardHash, name, abilityEffect } = val
        const { effect } = abilityEffect
        const transAbilityEffect = {
            scope: effect !== "0" && getCardEffectInfo("EffectScope", abilityEffect.scope),
            type: effect !== "0" && getCardEffectInfo("EffectType", abilityEffect.type),
            backMember: effect !== "0" && getCardEffectInfo("EffectBackMemberScope", abilityEffect.backMember),
            strength: effect !== "0" && getCardEffectInfo("EffectStrength", abilityEffect.strength),
        }
        const { scope, backMember, type, strength } = transAbilityEffect

        return (
            <li key={val.cardMobageId} className={styles.cardItems} onClick={() => itemOnClick(cardHash)}>
                <div className={styles.cardImgBox}>
                    <img src={`https://imas.gamedbs.jp/cg/image_sp/card/xs/${cardHash}.jpg`} />
                </div>
                <div className={styles.cardInfoBox}>
                    <ul>
                        <li>
                            카드명:{name}
                        </li>
                        <li>
                            특기: <label>{strength && `[${strength}]`}</label>{scope}{type}
                        </li>
                        <li>
                            백맴버: <label>{backMember && `[${strength}]`}</label>{backMember && scope}{backMember}{backMember && type}
                        </li>
                        <li>
                            특기원문 : {effect !== "0" && effect}
                        </li>
                    </ul>
                </div>
                <div className={styles.cardInfoBox}>
                    <ul>
                        <li>
                            공격력:
                        </li>
                        <li>
                            수비력:
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
