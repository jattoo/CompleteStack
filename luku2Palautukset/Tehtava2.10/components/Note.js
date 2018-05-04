import React from 'react'

const Note = ({note}) => {
    return (
        <h3>
            {note.name} {note.numero}
        </h3>
    )

}


export default Note
