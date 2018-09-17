import blogService from '../services/blogs'



const blogReducer = ( state = [], action) => {
    switch (action.type){
    case 'INIT_BLOG':
    //console.log('action data: ', action.data)
        return action.data
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

export default blogReducer
