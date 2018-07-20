import React from 'react'
import PropTypes from 'prop-types'
import { notifNews , notifReset  } from './../reducers/notifReducer'
import { voting } from './../reducers/anecdoteReducer'
import Filter from './Filter'



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
    
    

    render() {
        const anecdotes = this.context.store.getState().anecdotes
        const { filter } = this.context.store.getState()
        const showMe = anecdotes.find(note => note.content.toLowerCase().substr(0, 10) === filter) //refaktoroitu toimimaan lowercase ääkösten kanssa
        if (showMe){
            return (
                <div>
                    <h2>Anecdotes</h2>
                    <div>
                        <Filter />
                    </div>
                    {
                        <div key={showMe.id}>
                            <div>
                                {showMe.content}
                            </div>
                            <div>
                            has <a className="voteNumbers"><b>{showMe.votes}</b></a>{' '}
                                <button onClick={() => 
                                { this.context.store.dispatch(voting(showMe.id)),
                                this.context.store.dispatch(notifNews(showMe.content)),
                                setTimeout(() => {
                                    this.context.store.dispatch(notifReset())
                                }, 5000)}
                                }
                                >vote</button>
                            </div>
                        </div>
                    }
                </div>

            ) 
        } else {
        
            return (
                <div>
                    <h2>Anecdotes</h2>
                    <div>
                        <Filter />
                    </div>
                    {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                        <div key={anecdote.id}>
                            <div>
                                {anecdote.content}
                            </div>
                            <div>
                            has <a className="voteNumbers"><b>{anecdote.votes}</b></a>{' '}
                                <button onClick={() => 
                                {this.context.store.dispatch(voting(anecdote.id)),
                                this.context.store.dispatch(notifNews(anecdote.content)),
                                setTimeout(() => {
                                    this.context.store.dispatch(notifReset())
                                }, 5000)}
                                }
                                >vote</button>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    }
    
}



AnecdoteList.contextTypes= {
    store: PropTypes.object
}
export default AnecdoteList