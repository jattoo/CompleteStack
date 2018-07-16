import React from 'react'
import PropTypes from 'prop-types'



class AnecdoteList extends React.Component {
    componentDidMount(){
        const { store } = this.context
        console.log('store: ', store.getState())
        this.unsubscribe = store.subscribe(() => 
            this.forceUpdate()    
        )
    }

    componentWillUnmount(){
        this.unsubscribe()
    }
    
    render() {//.getState()
        const anecdotes = this.context.store.getState().anecdotes
        console.log(anecdotes)
        return (
            <div>
                <h2>Anecdotes</h2>
                {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has <a className="voteNumbers"><b>{anecdote.votes}</b></a>{' '}
                            <button onClick={() => 
                                this.context.store.dispatch({ type: 'VOTE', id: anecdote.id })
                            }>vote</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

AnecdoteList.contextTypes= {
    store: PropTypes.object
}
export default AnecdoteList