let initialState = 'filter object'

const filterReducer = (store = initialState, action) => {
    switch (action.type){
    case 'FILTER':
        console.log('filter action: ',action.text)
        return action.text
    default:
        return store
    }
}

export const filterView = (text) => {
    return {
        type: 'FILTER',
        text,
    }
}

export default filterReducer