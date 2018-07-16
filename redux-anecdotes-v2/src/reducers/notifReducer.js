const initialState = 'render here notification...'
const notifReducer = (store =  initialState, action) => {
    console.log('notifR: ', store.length)
    switch (action.type) {
    case 'NOTICE':
        return action.notif
    default :
        return store
    }
    
}
export const notifNews = () => {
    return {
        type: 'NOTICE',
        
    }
}

export default notifReducer