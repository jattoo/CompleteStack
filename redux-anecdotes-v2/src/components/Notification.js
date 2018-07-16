import React from 'react'
import PropTypes from 'prop-types'
import store from './../store'

class Notification extends React.Component {

    render() {
        return (
            <div className="style">
                {store.getState().notif}
            </div>
        )
    }
}

Notification.contextTypes = {
    store: PropTypes.object
}

export default Notification