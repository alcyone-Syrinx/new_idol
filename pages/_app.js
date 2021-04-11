import React from 'react'
import withReduxSaga from 'next-redux-saga'
import configureStore from '../store/store'

const App = ({ Component, store }) => {
    return <Component {...store} />
}

export default configureStore.withRedux(withReduxSaga(App))