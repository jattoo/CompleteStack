import React from 'react'
import { createBlog } from './../reducers/anecdoteReducer'
import PropTypes from 'prop-types'
import store from './../store'

class AnecdoteForm extends React.Component {
    
  handleSubmit = (e) => {
      e.preventDefault()
      const newGuy = e.target.anecdote.value
      console.log('in anecdoterform: ',e.target.anecdote.value)
      if(newGuy.length > 0){
          store.dispatch(
              createBlog(e.target.anecdote.value)
          )
      }
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

AnecdoteForm.contexTypes= {
    store: PropTypes.object
}

export default AnecdoteForm