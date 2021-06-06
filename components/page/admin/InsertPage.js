import React, { Component, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import action from '../../../store/action'
import axios from 'axios'

const InsertPage = () => {
    const [ip, setIp] = useState('')

    const test = async () => {
        const data = await axios.get(`/api/rank?id=${ip}`)
        const { content } = data.data
        const avg = content.reduce((acc, val) => {
            const name = val.ranking[0].name
            const total = acc.total + val.ranking[0].gainPointOneHourBySystemId
            const count = acc.count + 1
            let min = acc.min ? acc.min > val.ranking[0].gainPointOneHourBySystemId ? val.ranking[0].gainPointOneHourBySystemId : acc.min : val.ranking[0].gainPointOneHourBySystemId
            min = val.ranking[0].gainPointOneHourBySystemId === 0 ? acc.min : min
            const max = acc.max ? acc.max < val.ranking[0].gainPointOneHourBySystemId ? val.ranking[0].gainPointOneHourBySystemId : acc.max : val.ranking[0].gainPointOneHourBySystemId
            return {
                name,
                total, count, min, max
            }
        }, { name: '', total: 0, count: 0, min: 0, max: 0 })
        const result = {
            name: avg.name,
            avg: Math.floor(avg.total / avg.count),
            min: avg.min,
            max: avg.max
        }
        console.log(result)
    }

    return (
        <div >
            <input value={ip} onChange={(e) => setIp(e.target.value)} />
            <button onClick={test}>dd</button>
        </div>
    )
}

export default InsertPage
