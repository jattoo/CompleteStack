import React from 'react'
import store from './../store'
import { connect } from  'react-redux'

class Notification extends React.Component {
    render() {
        return (
            <div className="style">
                {store.getState().notif}
            </div>
        )
    }
}
const mapStateToProps = (store) => {
    return {
        notif: store.notif
    }
}


const ConnectedNotification = connect(
    mapStateToProps,
    null
)(Notification)

export default ConnectedNotification