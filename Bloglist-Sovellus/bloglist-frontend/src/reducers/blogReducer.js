import blogService from '../services/blogs'



const blogReducer = ( state = [], action) => {
    switch (action.type){
    case 'INIT_BLOG':
    //console.log('action data: ', action.data)
        return action.data
    case 'UPDATE':
        const blogId = state.find(f => f.id === action.data.id)
        const changedBlog = {...blogId, likes: blogId.likes + 1}
        //console.log(changedBlog)
        return state.map(blog => blog.id !== action.data.id ? blog : changedBlog)
    case 'CANCEL_LIKES':
        const realId = state.find(found => found.id === action.data.id)
        const cancelHere = { ...realId, likes: realId.likes - 1}
        return state.map(m => m.id !== action.data.id ? m : cancelHere) 
    default:
        return state
    }
}

export const blogInit = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOG',
            data: blogs
        })
    }
}

export const updateBlog = (id) => {
    return async (dispatch) => {
        dispatch({
            type: 'UPDATE',
            data: {
                id
            }
        })
    }
}

export const cancelAlike = (id) => {
    return async (dispatch) => {
        dispatch({
            type: 'CANCEL_LIKES',
            data: {
                id
            }
        })
    }
}

export default blogReducer