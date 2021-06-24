

import styles from './CardInfo.scss'
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import action from '../../../store/action'

const CardInfo = ({ hash }) => {
    const dispatch = useDispatch()
    const { infoAction } = action

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = async () => {
        const cardData = await axios.get(`/query/cards/findByHash?hash=${hash}`).then(rst => rst.data)

        if (cardData.length === 0) return

        const { idol_id } = cardData[0]
        const idolData = await axios.get(`/query/idols/findById?idolId=${idol_id}`).then(rst => rst.data)

        const body = {
            ...cardData[0],
            ...idolData[0]
        }

        dispatch(infoAction.updateDetailCardInfo(body))
    }


    return (
        <div className={styles.infoContainer}>
            <div className={styles.header}>
                카드정보
                <div className={styles.content}>
                    <img
                        key={hash}
                        src={`https://imas.gamedbs.jp/cg/image_sp/card/l/${hash}.jpg`}
                    />
                    <div className={styles.cardInfo}>
                        솰라솰라
                    </div>
                </div>

            </div>

            <div className={styles.header}>
                대사
            </div>
        </div>
    )
}

export default CardInfo