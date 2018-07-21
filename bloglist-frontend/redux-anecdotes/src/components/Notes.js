import React from 'react'
import actionFor from '../actionCreators'
import PropTypes from 'prop-types'


class Notes extends React.Component{
    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() =>
          this.forceUpdate()
        )
      }
    
      componentWillUnmount() {
        this.unsubscribe()
      }
    
    voting = (id) => () => {
        this.context.store.dispatch(
          actionFor.givingVotes(id)
        )
      }
      cancelVote = (id) => () => {
        this.context.store.dispatch(
          actionFor.cancellingVotes(id)
        )
      }
    render(){
        const anecdotes = this.context.store.getState()
        //tehtävä 5.20 anekdootit, osa 2
        const sortedNote = anecdotes.sort(function(a , b ) {
        return b.votes - a.votes
        })
        return (
            <div>
                {sortedNote.map(anecdote=>
                    <div key={anecdote.id}>
                    <div>
                        {anecdote.content} 
                    </div>
                    <div>
                        has {anecdote.votes}{' '}
                        <button onClick={this.voting(anecdote.id)}>vote</button>
                        <button onClick={this.cancelVote(anecdote.id)}>cancel vote</button>
                    </div>
                    </div>
            
                )}
            </div>
        )
    }
}

Notes.contextTypes = {
    store: PropTypes.object
}


export default Notes