import styles from './SearchModal.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import action from '../../../store/action'

const SearchModal = () => {
    const disPatch = useDispatch()
    const [transList, setTransList] = useState([])
    const state = useSelector(state => state.search)
    const {
        overlapIdols,
        modalDisplay
    } = state

    useEffect(async () => {
        const temp = await axios.get(`http://localhost:3002/query/translations/findAll`)
        setTransList(temp.data?.reduce((acc, val) => {
            acc[val.idol_id] = val.trans_name
            return acc
        }, {}))
    }, [])

    const selectIdols = (inputValue) => {
        const { searchAction } = action
        disPatch(searchAction.updateInputvalue(inputValue))
        disPatch(searchAction.updateImgData([]))
        disPatch(searchAction.updateLoadingDisplay('block'))
        disPatch(searchAction.searchCardData(inputValue))
        disPatch(searchAction.resetModal())
    }

    const renderIdolList = useMemo(() => {
        return (
            <div className={styles.modalContent}>
                <button className={styles.close} onClick={() => disPatch(action.searchAction.resetModal())}>x</button>
                <div className={styles.modalHeader}>
                    중복값이 검색되었습니다. 선택해주세요.
                </div>
                <div>
                    {overlapIdols.map(a => { return (<div className={styles.modalList} onClick={() => selectIdols(transList[a])}>{transList[a]}</div>) })}
                </div>
            </div>
        )
    }, [overlapIdols])

    return (
        <div className={styles.modal} style={{ display: modalDisplay ? 'block' : 'none' }}>
            {renderIdolList}
        </div>

    )
}

export default SearchModal
