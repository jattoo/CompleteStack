const notifReducer = (store = '', action) => {
    switch (action.type) {
        case 'NOTICE':
            console.log('notif action: ',action.text)
            return action.text
        case 'RESET':
            return action.text
        default:
            return store
    }
}

export const notifNews = (text) => {
    console.log('dispatching notifNew: ', text)
    return async (dispatch) => {
        dispatch({
            type: 'NOTICE',
            text
        })
        
    }
}

export const notifOff = (text) => {
    return async (dispatch) => {
        dispatch({
            type: 'RESET',
            text
        })
    }
}

export default notifReducer
