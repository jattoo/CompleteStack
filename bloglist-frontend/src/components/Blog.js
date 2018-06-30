import React from 'react'


class Blog extends React.Component{
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
            <div >
                <div style={hideWhenVisible} className='blogStyle'>
                    <a onClick={this.toggleVisibility}>{this.props.title} {this.props.author}</a>
                </div>
                <div style={showWhenVisible} className='SingleStyle'>
                    <h3 onClick={this.toggleVisibility}>{this.props.title} {this.props.author}</h3>
                    <h4>{this.props.url}</h4>
                    <h4>{this.props.likes} {
                    <button onClick={this.props.likesCliked}>likes</button>}<br/></h4>
                    <h4>{'added by '} {this.props.username}</h4>
                </div>
            </div>
        )

    }
}

export default Blog