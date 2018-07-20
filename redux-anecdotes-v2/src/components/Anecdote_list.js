import React from 'react'
import { connect } from 'react-redux'
import { notifNews , notifReset  } from './../reducers/notifReducer'
import { voting } from './../reducers/anecdoteReducer'
import Filter from './Filter'
import store from './../store'



class AnecdoteList extends React.Component {
   

    render() {
        const { filter, anecdotes } = store.getState()
        const showMe = anecdotes.find(note => note.content.toLowerCase().substr(0, 10) === filter)
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
                                {this.props.votersCard(showMe.id),
                                this.props.sendNotifications(showMe.content),
                                setTimeout(() => {
                                    this.props.clearAll()
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
                                {store.dispatch(voting(anecdote.id)),
                                store.dispatch(notifNews(anecdote.content)),
                                setTimeout(() => {
                                    store.dispatch(notifReset())
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


const mapStateToProps = (store) => {
    return {
        anecdote: store.anecdote,
        notif: store.notif,
        filter: store.filter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        votersCard: (value) => {
            dispatch(voting(value))
        },
        sendNotifications: (value) => {
            dispatch(notifNews(value))
        },
        clearAll: (value) => {
            dispatch(notifReset(value))
        }
    }
}
const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList