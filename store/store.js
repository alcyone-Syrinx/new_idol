import { createStore, applyMiddleware, compose } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'
import rootsaga from '../sagas'
import createSagaMiddleWare from 'redux-saga'
import logger from 'redux-logger';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleWare()
    const middlewares = [sagaMiddleware]
    const store = createStore(rootReducer, applyMiddleware(...middlewares, logger))
    store.sagaTask = sagaMiddleware.run(rootsaga)
    return store
}

const wrapper = createWrapper(configureStore, {
    debug: true
})

export default wrapper
