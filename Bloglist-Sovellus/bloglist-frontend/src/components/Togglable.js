import React from 'react'
import PropType from 'prop-types'

class Togglable extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visible : false
        }
    }

    //funktio huolehtii staten boolean arvon vaihtoon
    toggleVisibility = () => {
        this.setState({
            visible : !this.state.visible
        })
    }

    render(){
        //muutujien avulla asetettaan css display methodin arvo ja muuttujat on valmis
        //meille käyttöön
        const hideWhenVisible = { display: this.state.visible ? 'none' : ''}
        const showWhenVisible = { display: this.state.visible ? '' : 'none'}
        return(
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
                </div>
                <div style={showWhenVisible}>
                    {this.props.children}
                    <button onClick={this.toggleVisibility}>cancel</button>
                </div>
            </div>
        )

    }
}

Togglable.propTypes = {

    buttonLabel: PropType.string.isRequired
}
export default Togglable
