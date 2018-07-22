import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/Anecdote_list'
import { connect } from 'react-redux'
import { anectInit } from './reducers/anecdoteReducer'

class App extends React.Component {
    componentDidMount() {
        this.props.anectInit()
    }
    render() {
        return (
            <div>
                <h1>Programming anecdotes</h1>
                <Notification />
                <AnecdoteList />
                <AnecdoteForm />
            </div>
        )
    }
}


export default connect(
    null,
    { anectInit }
)(App)