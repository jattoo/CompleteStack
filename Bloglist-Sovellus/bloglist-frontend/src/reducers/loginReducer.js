const loginReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN_INIT':
        //console.log('login data: ',action.data)
        const doSomething = JSON.parse(action.data)
            return doSomething
        default:
            return state
    }
}

export const loginInit = () => {
    return async (dispatch) => {
        const userOnline = await window.localStorage.getItem('currentUser')
        dispatch({
            type: 'LOGIN_INIT',  
            data: userOnline
        })
    }
}

export default loginReducer