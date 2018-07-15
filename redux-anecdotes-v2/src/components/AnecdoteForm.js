import React from 'react'
import { createBlog } from './../reducers/anecdoteReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
      e.preventDefault()
      console.log('in anecdoterform: ',e.target.anecdote.value)
      this.props.store.dispatch(
          createBlog(e.target.anecdote.value)
      )
  
      e.target.anecdote.value = ''
  }
  render() {
      return (
          <div>
              <h2>create new</h2>
              <form onSubmit={this.handleSubmit}>
                  <div><input name='anecdote'/></div>
                  <button>create</button> 
              </form>
          </div>
      )
  }
}

export default AnecdoteForm