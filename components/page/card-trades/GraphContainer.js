import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Slider from 'react-input-slider'

/* Internal imports */
import styles from './TradeChart/TradeChart.scss'
import styles2 from './CardTrades.scss'

const calculateCost = (items, energePerStamina) => {
    return items.reduce((acc, value) => {
        if (typeof acc !== undefined) {
            if (value?.itemTypeId === 1) {
                return acc + (value?.volume || 0)
            } else if (value?.itemTypeId === 2) {
                return acc + Math.floor((value?.volume || 0) * energePerStamina)
            }
            return undefined
        }
    }, 0)
}

const getAverage = (values) => Math.ceil(values.reduce((a, b) => a + b, 0) / values.length)

const parseDate = (dateString) => dateString?.substring(0, 10)

const GraphContainer2 = ({ trades = [] }) => {
    const [energePerStamina, setEnergePerStamina] = useState(1.5)

    const renderChart = useCallback(() => {
        const chartData = trades
            .map(trade => ({ date: parseDate(trade.tradeTime), value: calculateCost(trade.item, energePerStamina) }))
            .filter(chartValue => chartValue.value)
            .reduce((acc, value) => {
                if (!acc[value.date]) {
                    acc[value.date] = []
                }
                acc[value.date].push(value.value)
                return acc
            }, {})

        const maxCost = Object.values(chartData)
            .map(costs => getAverage(costs))
            .reduce((acc, value) => Math.max(acc, value), 0)

        return (
            Object.keys(chartData).sort().map(date => (
                <div className={styles.chartItem} key={date}>
                    <div className={styles.chartGraph}>
                        <div className={styles.chartLine} style={{ height: `${getAverage(chartData[date]) * 100 / maxCost}%` }}>
                            <div className={styles.chartCost}>{getAverage(chartData[date])}</div>
                        </div>
                    </div>
                    <div className={styles.chartDate}>{date.substring(5)}</div>
                </div>
            ))
        )
    }, [energePerStamina])

    return (
        <div className={styles2.graphContainer} >
            <div>{`에네드링배율: ${energePerStamina}`}</div>
            <Slider
                axis="x"
                xstep={0.1}
                xmin={1.0}
                xmax={2.0}
                x={energePerStamina}
                onChange={({ x }) => setEnergePerStamina(x.toFixed(1))}
            />
            <div className={styles.chartContainer}>
                {renderChart()}
            </div>
        </div>
    )
}

export default GraphContainer2
