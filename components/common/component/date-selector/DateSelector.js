import React, { Component, useState } from 'react'
import moment from 'moment';

const DateSelector = () => {

    const date = (d) => {
        console.log(moment(d).format())
        console.log(moment(d).add("-30", "d").format())
    }

    const [startDate, setStartDate] = useState(new Date());

    return (
        <div>
            {date(startDate)}
        </div>
    )
}

export default DateSelector
