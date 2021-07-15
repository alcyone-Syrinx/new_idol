

import styles from './CardInfo.scss'
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import action from '../../../store/action'

const CardInfo = ({ hash }) => {
    const dispatch = useDispatch()
    const { infoAction } = action
    const state = useSelector(state => state.info)
    const {
        cardScripts,
        detailCardInfo
    } = state

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = async () => {
        const cardData = await axios.get(`/query/cards/findByHash?hash=${hash}`).then(rst => rst.data)
        if (cardData.length === 0) return
        const { idol_id } = cardData[0]
        const idolData = await axios.get(`/query/idols/findById?idolId=${idol_id}`).then(rst => rst.data)
        const scripts = await axios.get(`/query/script/findByHash?card_hash=${hash}`)
        const body = {
            ...cardData[0],
            ...idolData[0]
        }

        dispatch(infoAction.updateDetailCardInfo(body))
        dispatch(infoAction.updateCardScripts(scripts?.data))
    }

    const renderScripts = (scripts) => {
        const reduce = scripts?.reduce((acc, item) => {
            if (!acc[item.script_category]) {
                acc = { ...acc, [item.script_category]: [] }
            }

            const body = [...acc[item.script_category], item];

            return {
                ...acc,
                [item.script_category]: body
            }
        }, {})

        if (!reduce) {
            return
        }
        const titles = Object.keys(reduce)
        const temp = titles.reduce((acc, item) => {
            const group = reduce[item]?.reduce((acc, item) => {
                if (!acc[item.script_group]) {
                    acc = { ...acc, [item.script_group]: [] }
                }

                const body = [...acc[item.script_group], item];
                return {
                    ...acc,
                    [item.script_group]: body
                }
            }, {})
            const groupKey = Object.keys(group)

            return (
                <div>
                    {acc}
                    <div className={styles.scriptHeader}>{item}</div>
                    <div className={styles.scriptGroupHeader}>
                        {groupKey.map(a => {
                            return (
                                <div>
                                    <div className={styles.scriptGroupHeader}>{a}</div>
                                    {group[a]?.map(scripts => <div><div>원문:{scripts.card_script}</div><div>번역:{scripts.trans_script}</div></div>)}
                                </div>
                            )
                        })}
                    </div>

                </div>
            )
        }, (<div></div>))
        return temp
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
                {renderScripts(cardScripts)}
            </div>
        </div>
    )
}

export default CardInfo