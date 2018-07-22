import { createStore ,combineReducers, applyMiddleware } from 'redux'
import notifReducer from './reducers/notifReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' 

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notif: notifReducer,
    filter: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk))
        
)

export default store