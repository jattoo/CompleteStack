
let initialState = 'hello world'

const notifReducer = (store =  initialState, action) => {
    //console.log('notifR: ', store.length)
    switch (action.type) {
    case 'NOTICE':
        //store = action.text
        //store.push(action.text)
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
export const notifNews = (text) => {
    return {
        type: 'NOTICE',
        text: 'you voted '+ text 
    }
}
export const notifReset = () => {
    return {
        type: 'RESET',
        text: 'No Changes yet'
    }
}
 
export const newBlogNotif = (text) => {
    return {
        type: 'NEWNOTE',
        text: 'you\'ve added ' + text 
    }
}
export default notifReducer