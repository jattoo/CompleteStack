import noteService from  '../services/notes'

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
    return async (dispatch) => {
        const inComingAnecdote = await noteService.createAnecdote(content)
        dispatch({
            type: 'CREATE', 
            data: inComingAnecdote
        })
    }
}
export const voting = (id) => {
    return async(dispatch) => {
        const findOut  = await noteService.getAll()
        const anecdote = findOut.find(f => f.id === id)
        await noteService.updateAnecdotes(anecdote.id, anecdote)
        dispatch({
            type: 'VOTE',
            id
        })        
    }
} 
export const anectInit = () => {
    return async (dispatch) => {
        const anecdotes = await noteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
        
    }
}
export default reducer