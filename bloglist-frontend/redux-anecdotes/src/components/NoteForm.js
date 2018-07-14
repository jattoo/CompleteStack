import React from 'react'
import actionFor from '../actionCreators'
import PropTypes from 'prop-types'


class NoteForm extends React.Component{
    componentDidMount(){
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => 
            this.forceUpdate()
        )
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
        
    addNote = (e) => {
        e.preventDefault()
        const newNote = e.target.newNote.value
        console.log('newnote: ',newNote.length)
        if(newNote.length > 0 ){
            this.context.store.dispatch(
                actionFor.noteCreation(newNote)
            )
        }
        e.target.newNote.value= ''
      }
    
    render(){
        return (
            <div>
                <form onSubmit={this.addNote}>
                    <div><input name="newNote"/></div>
                    <button>create</button> 
                </form>
        </div>
        )
    }
}

NoteForm.contextTypes = {
    store: PropTypes.object
}
export default NoteForm