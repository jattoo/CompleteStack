

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const getId = () => (100000*Math.random()).toFixed(0)
  
  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
 

  const initialState = anecdotesAtStart.map(asObject)
  
  const reducer = (state = initialState, action) => {
  console.log('state now: ',state)
    
    
    
    switch (action.type){
      case 'VOTE': 
        const noteId = state.find(not => not.id === action.data.id)
        const changedNote = { ...noteId, votes: noteId.votes + 1}
        console.log(changedNote)
        return state.map(note => note.id !== action.data.id ? note : changedNote)
      
      case 'ADD_NOTE':
        const newComer = {
          content: action.data.text,
          id: getId(),
          votes: 0
        }
        const updated = state.concat(newComer)
        state = updated
        console.log('state after update', state)
        return state 
        
      default:
        return state
    }
  }
  
  export default reducer