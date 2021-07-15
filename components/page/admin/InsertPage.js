import React, { Component, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import action from '../../../store/action'
import axios from 'axios'
import styles from './InsertPage.scss'

const InsertPage = () => {
    const [input, setInput] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const findIdol = async () => {
        const data = await axios.get(`/query/translations/findCodeByName?name=${input}`).then(rst => rst.data)
        setSearchResult(data)
    }

    const insertScript = async (id) => {
        const insert = await axios.get(`/crowl/test?id=${id}`).catch(e => console.log(e))
        console.log(insert)
    }

    const renderContent = ({ idol_id, trans_name }) => {
        return (
            <li className={styles.cardItems}>
                <div className={styles.cardInfoBox}>{trans_name}</div >
                <div className={styles.cardInfoBox}>
                    <button className={styles.submit}>초기화</button>
                    <button className={styles.submit} onClick={() => insertScript(idol_id)}>동기화</button>
                </div >
            </li>)
    }

    return (
        <div >
            <div className={styles.searchBody}>
                <div className={styles.inputBody}>
                    <label>검색</label><input value={input} onChange={(e) => setInput(e.target.value)} />
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.submit} onClick={findIdol}>확인</button>
                </div>
                <div className={styles.contentContainer}>
                    <ul className={styles.contentBody}>
                        {searchResult?.map(item => renderContent(item))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default InsertPage
