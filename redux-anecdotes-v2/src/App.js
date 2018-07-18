import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/Anecdote_list'
class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Programming anecdotes</h1>
                <Notification />
                <AnecdoteList  />
                <AnecdoteForm  />
            </div>
        )
    }
}

export default App