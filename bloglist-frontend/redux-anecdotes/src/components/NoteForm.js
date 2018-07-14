import React from 'react'
import actionFor from '../actionCreators'

class NoteForm extends React.Component{
    addNote = (e) => {
        e.preventDefault()
        const newNote = e.target.newNote.value
        console.log('newnote: ',newNote.length)
        if(newNote.length > 0 ){
            this.props.store.dispatch(
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
export default NoteForm