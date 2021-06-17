import { combineReducers } from 'redux'
import { searchReduecer } from './search/search-reducer'
import { tradeReducer } from './search/trade-reducer'
import { infoReducer } from './info/info-reducer'

export default combineReducers({
    search: searchReduecer,
    trade: tradeReducer,
    info: infoReducer
})
