import React from 'react'
import store from  './../store'
import { filterView } from './../reducers/filterReducer'
import PropTypes from 'prop-types'

class Filter extends React.Component {
    componentDidMount(){
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => 
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }
    handleChange = (e) => {
        //const item = store.
        store.dispatch(filterView(e.target.value))
    }
    render() {
        const style = {
            marginBottom: 10
        }
  
        return (
            <div style={style}>
                filter: <input onChange={this.handleChange}/>
            </div>
        )
    }
}

Filter.contextTypes = {
    store: PropTypes.object
}
export default Filter