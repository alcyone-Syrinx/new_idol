import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import Router from 'next/router'

import styles from './CardList.scss'
import LoaderContainer from '../../../common/component/loader-container/LoaderContainer'
import { useDispatch, useSelector } from 'react-redux'
import action from '../../../../store/action'

const onItemClick = (hash) => {
    Router.push({ pathname: `/card-trades/${hash}` })
}

const CardList = () => {
    const dispatch = useDispatch()
    const tradeState = useSelector(state => state.trade)
    const searchState = useSelector(state => state.search)
    const { loading, idolId } = tradeState
    const { imgData } = searchState
    const { searchAction, tradeAction } = action

    useEffect(() => {
        console.log(idolId)
        dispatch(searchAction.searchCardData(idolId))
        try {
            // const cardsResult = await axios.get(`http://localhost:3002/api/card-search?id=${idolId}`)
            // setCards(cardsResult?.data?.content || [])
            // setLoading(false)
        } catch (error) {
            // setCards([])
            // setLoading(false)
        }
    }, [])

    const renderCard = useCallback((card) => (
        <img
            key={card.cardHash}
            className={styles.card}
            src={`https://imas.gamedbs.jp/cg/image_sp/card/xs/${card.cardHash}.jpg`}
            onClick={() => onItemClick(card?.cardHash)}
            alt={card.cardHash}
        />
    ), [])

    const renderCards = useCallback(() => (
        <LoaderContainer loading={loading}>
            <div className={styles.container}>
                {imgData.map(card => renderCard(card))}
            </div>
        </LoaderContainer>
    ), [loading, imgData])

    return (
        <div>
            {renderCards()}
        </div>
    )
}

export default CardList
