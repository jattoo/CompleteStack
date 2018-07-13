import React from 'react'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      newNote: ''
    }
  }
  
  voting = (id) => () => {
    this.props.store.dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
  handleChange = (e) => {
    this.setState({
      newNote: e.target.value
    })
    //console.log('input', this.state.newNote)
  }
  
  addNote = (text) => () => {
    const noteToAdd = this.state.newNote
    text = noteToAdd
    this.setState({
      newNote: ''
    })
    this.props.store.dispatch({
      type: 'ADD_NOTE',
      data: { text } 
    })
  }
  render() {
    
    
    const anecdotes = this.props.store.getState()
    //tehtävä 5.20 anekdootit, osa 2
    const sortedNote = anecdotes.sort(function(a , b ) {
      return b.votes - a.votes
    })
    console.log('sorted: ',sortedNote)
    return (
      <div>
        <h2>Anecdotes</h2>
        {sortedNote.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}{' '}
              <button onClick={this.voting(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={e => {
          e.preventDefault()

        }}>
          <div><input type='text' value={this.state.newNote} onChange={this.handleChange}/></div>
          <button onClick={this.addNote()} >create</button> 
        </form>
      </div>
    )
  }
}

export default App
