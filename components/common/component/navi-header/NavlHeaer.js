import React, { Component } from 'react'
import styles from './NaviHeader.scss'

class NaviHeader extends Component {
    render() {
        return (
            <div>
                <ul className={styles.navHeaderBody}>
                    <li>
                        <a href="/">홈</a>
                    </li>
                    <li>
                        <a href="/idols">검색</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NaviHeader
