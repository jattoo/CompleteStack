import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from  './reducers/blogReducer'
import notifReducer from './reducers/notifReducer'
import userReducer from './reducers/userReducer'


const reducer = combineReducers({
    blogs: blogReducer,
    notif: notifReducer,
    user: userReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store