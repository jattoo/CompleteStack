import React from 'react'


const Notification = ({ msg }) => {
    if (msg === null) {
        return null
    }
    return (
        <div id="notif">
            {msg}
        </div>
    )
}


export default Notification 