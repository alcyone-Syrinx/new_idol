import React, { Component } from 'react'

import styles from './LoaderContainer.scss'

const LoaderContainer = ({ loading, className, children }) => {
    return (
        <div className={className}>
            {
                loading
                    ? (
                        <div className={styles.container}>
                            <div className={styles.loader}>
                                <svg className={styles.circular}>
                                    <circle className={styles.path} cx="24" cy="24" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10"></circle>
                                </svg>
                            </div>
                        </div>
                    )
                    : children
            }
        </div>
    )
}

export default LoaderContainer
