import React from 'react'
import PropTypes from 'prop-types'
import store from './../store'

class Notification extends React.Component {
    
    componentDidMount(){
        //console.log('store in notification: ',store.getState())
        const { store } = this.context
        this.unsubcribe = store.subscribe(() => 
            this.forceUpdate()
        )
    }
    componentWillUnmount() {
        this.unsubcribe()
    }
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