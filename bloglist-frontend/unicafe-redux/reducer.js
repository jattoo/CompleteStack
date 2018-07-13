const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GOOD':
          console.log('good: ', state.good)
          return { ...state, good: state.good + 5 }
        case 'OK':
          console.log('ok: ', state.ok)
          return { ...state, ok: state.ok + 4 }
        case 'BAD':
          console.log('bad: ', state.bad)
          return { ...state, bad: state.bad + 2 }
        default:
          return state
    }
  }
  
  export default counterReducer
