import React from 'react'
//import store from  './../store'
import { filterView } from './../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  
    
    handleChange = (e) => {
        this.props.filterObj(e.target.value)
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

const mapStateToProps = (store) => {
    return {
        filter: store.filter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterObj: (value) => {
            dispatch(filterView(value))
        }
    }
}

const ConnectedFilterComponent = connect(
    mapStateToProps,
    mapDispatchToProps
) (Filter)
export default ConnectedFilterComponent