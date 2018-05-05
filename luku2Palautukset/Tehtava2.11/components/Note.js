import React from 'react'

const Note = ({note}) => {
    return (
        <li>
            {note.name} {note.number}
        </li>
    )

}



export default Note
