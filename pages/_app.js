import React from 'react'
import withReduxSaga from 'next-redux-saga'
import configureStore from '../store/store'

const App = (props) => {
    const { Component, router } = props
    const { query } = router
    return <Component {...query} />
}

export default configureStore.withRedux(withReduxSaga(App))