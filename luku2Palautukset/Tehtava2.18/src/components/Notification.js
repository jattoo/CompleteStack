
import React from 'react'

const Notification = ({ viestit }) => {
    if (viestit === null ){
        return null
    }
    return (
        <div className= "error">
            {viestit}
        </div>
    )
}

export default Notification
