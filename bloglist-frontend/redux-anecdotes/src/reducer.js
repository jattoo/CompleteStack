const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'A machine that takes in coffee and produces code!!',
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
  switch (action.type){
    case 'VOTE': 
      const noteId = state.find(not => not.id === action.data.id)
      const changedNote = { ...noteId, votes: noteId.votes + 1}
      console.log(changedNote)
      return state.map(note => note.id !== action.data.id ? note : changedNote)
    
    case 'ADD_NOTE':
      return [...state, action.data ]
    case 'CANCEL_VOTE':
      const realId = state.find(found => found.id === action.data.id)
      const cancelHere = { ...realId, votes: realId .votes - 1}
      return state.map(m => m.id !== action.data.id ? m : cancelHere)
    default:
      return state
  }
}

export default reducer