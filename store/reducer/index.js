import { combineReducers } from 'redux'
import { searchReduecer } from './search/search-reducer'

export default combineReducers({
    search: searchReduecer
})
