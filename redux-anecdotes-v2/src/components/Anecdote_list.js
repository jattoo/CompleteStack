import React from 'react'
import { connect } from 'react-redux'
import { notifNews , notifReset  } from './../reducers/notifReducer'
import { voting } from './../reducers/anecdoteReducer'
import Filter from './Filter'
import store from './../store'



class AnecdoteList extends React.Component {
    render() {
        return (
            <div>
                <h2>Anecdotes</h2>
                <div>
                    <Filter />
                </div>
                {this.props.visibileNotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const anecdotesToShow = (anecdote, notif, filter) => {
    const showMe = anecdote.find(note => note.content.toLowerCase().substr(0, 10) === filter)
    return showMe ? [showMe] : anecdote
}

const mapStateToProps = (store) => {
    return {
        visibileNotes: anecdotesToShow(store.anecdotes,store.notif,store.filter)
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