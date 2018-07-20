const getId = () => (100000*Math.random()).toFixed(0)
const reducer = (store = [], action) => {
    switch (action.type){
    case 'VOTE':
        const old = store.filter(a => a.id !== action.id)
        const voted = store.find(a => a.id === action.id)
        //console.log(action.id.id)
        return [...old, { ...voted, votes: voted.votes + 1 } ]
    case 'CREATE':
        //console.log('The actions: ', action.data)
        return [...store, action.data]
    case 'INIT_ANECDOTES':
        return action.data
    default:
        return store
    }
}

export const createBlog = (content) => {
    console.log('content: ', content)
    return {
        type: 'CREATE', 
        data: {
            content,
            id: getId(), 
            votes:0 
        }
    }
}
export const voting = (id) => {
    return {
        type: 'VOTE',
        id
    }
} 
export const anectInit = (data) => {
    return {
        type: 'INIT_ANECDOTES',
        data
    }
}
export default reducer