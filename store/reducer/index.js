import { combineReducers } from 'redux'
import { searchReduecer } from './search/search-reducer'
import { tradeReducer } from './search/trade-reducer'

export default combineReducers({
    search: searchReduecer,
    trade: tradeReducer
})
