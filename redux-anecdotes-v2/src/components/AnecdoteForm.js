import React from 'react'
import { createBlog } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { newBlogNotif, notifReset } from './../reducers/notifReducer'

class AnecdoteForm extends React.Component {
    
  handleSubmit = (e) => {
      e.preventDefault()
      const newGuy = e.target.anecdote.value
      console.log('in anecdoterform: ',e.target.anecdote.value)
    
      //tällä ilmoitus kanava uuden muistinpanon lisäämisen varten
      this.props.anectform(e.target.anecdote.value)
      setTimeout(() => {
          this.props.clearAll()
      }, 5000)
      
      if(newGuy.length > 0){
          this.props.createnew(e.target.anecdote.value)
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
const mapStateToProps = (store) => {
    return {
        anecdote : store.anecdote
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        anectform: (value) => {
            dispatch(newBlogNotif(value))
        },
        clearAll: (value) => {
            dispatch(notifReset(value))
        },
        createnew: (value) => {
            dispatch(createBlog(value))
        }
    }
}
const ConnectedAnecdoteForm = connect(
    mapStateToProps,
    mapDispatchToProps
) (AnecdoteForm)

export default ConnectedAnecdoteForm