import React from 'react'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'

class App extends React.Component {
  
  render() {
    
    return (
      <div>
        <h2>Anecdotes</h2>
        <Notes store={this.props.store}/>
        <h2>create new</h2>
        <NoteForm store={this.props.store}/>
      </div>
    )
  }
}

export default App