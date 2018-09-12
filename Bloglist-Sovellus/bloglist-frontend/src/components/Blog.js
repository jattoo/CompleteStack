import React from 'react'
import  PropTypes from 'prop-types'


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
        
        if(this.props.currentUser === this.props.username || this.props.username === 'anonymous') {
            return(
                <div>
                    <div style={hideWhenVisible} className='blogStyle'>
                        <a onClick={this.toggleVisibility} className="hideContent">{this.props.title} {this.props.author}</a>
                    </div>
                    <div style={showWhenVisible} className='SingleStyle'>
                        <h3 onClick={this.toggleVisibility} className="showContent">{this.props.title} {this.props.author}</h3>
                        <h4><a>{this.props.url}</a></h4>
                        <h4>{this.props.likes} {}
                            <button onClick={this.props.addLikes(this.props.id)} className="likeButton">Add</button>
                            <button onClick={this.props.cancelLikes(this.props.id)} className="cancelButton">Cancel</button><br/></h4>
                        <h4>{'added by '} { this.props.username}</h4>
                        <button className='poisto' onClick={this.props.poisto(this.props.id)}>Delete</button>
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <div style={hideWhenVisible} className='blogStyle'>
                        <a onClick={this.toggleVisibility} className="hideContent">{this.props.title} {this.props.author}</a>
                    </div>
                    <div style={showWhenVisible} className='SingleStyle'>
                        <h3 onClick={this.toggleVisibility} className="showContent">{this.props.title} {this.props.author}</h3>
                        <h4><a>{this.props.url}</a></h4>
                        <h4>{this.props.likes} {}
                            <button onClick={this.props.addLikes(this.props.id)} className="likeButton">Add</button>
                            <button onClick={this.props.cancelLikes(this.props.id)}  className="cancelButton">Cancel</button><br/></h4>
                        <h4>{'added by '} { this.props.username}</h4>
                    </div>
                </div>
            )
        }

    }
}

Blog.propTypes= {
    addLikes: PropTypes.func.isRequired,
    cancelLikes: PropTypes.func.isRequired,
    poisto: PropTypes.func.isRequired
}
export default Blog