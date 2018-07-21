
import React from 'react'

const Note = ({note, takeDown}) => {
const label = 'poista'
  
        return (
            <div>
                <h3>
                    {note.name} {note.number} <button onClick={takeDown}>{label}</button>
                </h3>
        
            </div>
        )
    

}



export default Note
