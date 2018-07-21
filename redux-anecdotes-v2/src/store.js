import { createStore ,combineReducers } from 'redux'
import notifReducer from './reducers/notifReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notif: notifReducer
})
const store = createStore(reducer)
export default store