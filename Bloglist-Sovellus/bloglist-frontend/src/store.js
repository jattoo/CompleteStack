import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from  './reducers/blogReducer'
import notifReducer from './reducers/notifReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notif: notifReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store