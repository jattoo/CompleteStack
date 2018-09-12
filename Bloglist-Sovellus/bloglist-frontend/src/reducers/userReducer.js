import userService from '../services/users'

const userReducer = (state= [], action) => {
    switch(action.type){
    case 'INIT_USER':
        return action.data
    default: 
        return state
    }
}

export const userInit = () => {
    return async (dispatch) => {
        const user = await userService.getAll()
        dispatch({
            type: 'INIT_USER',
            data: user
        })
    }
}


export default userReducer