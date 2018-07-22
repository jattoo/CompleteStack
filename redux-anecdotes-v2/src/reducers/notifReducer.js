
let initialState = 'hello world'

const notifReducer = (store =  initialState, action) => {
    switch (action.type) {
    case 'NOTICE':
        console.log('notice action: ',action.text)
        return action.text
    case 'RESET':
        console.log('reset action: ',action.text)
        return action.text
    case 'NEWNOTE':
        console.log('new note action: ',action.text)
        return action.text
    default:
        return store
    }
}
export const notifNews = (text, time) => {
    return async (dispatch) => {
        dispatch({
            type: 'NOTICE',
            text
        })
        setTimeout(() => {
            dispatch ({
                type: 'RESET',
                text: 'No changes now'
            })
        }, time)
    }
}

/*
ei ole käytössä  enää. Jätin sen tänne omaan käyttöön
export const notifReset = () => {
    return {
        type: 'RESET',
        text: 'No Changes yet'
    }
}*/


export const newBlogNotif = (text, time) => {
    return async (dispatch) => {
        dispatch ({
            type: 'NEWNOTE',
            text 
        })
        setTimeout(() => {
            dispatch ({
                type: 'RESET',
                text: 'No changes now'
            })
        }, time)
    }
}
export default notifReducer