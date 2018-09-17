import React from 'react'
import Represent from './Represent'
import blogService from '../services/blogs'
import { notifNews, notifOff } from '../reducers/notifReducer'

const TheBlog = (props) => {
    let value
    //console.log(blog)
    //blog ? console.log('blog comments: ',blog.comments.map(m => m.comments) ): ''

  
    const handleChange = (e) => {
        e.target.name = e.target.value
        value = e.target.name
    }
  
    const addComment = (e) => {
        e.preventDefault()
        const blogToEdit = props.allblogs.find(f => f.id === props.blog.id)
        // console.log('Blog to test: ',blogToEdit)
        //console.log(value)
        const generatId = () => Number(Math.random() * 100000000).toFixed(0)
        const newComments = {
            'comments' : value,
            'id': generatId()
        }

    
        blogToEdit.comments = []
   
        blogService
            .coMment(props.blog.id, newComments)
            .then(ablog => {
                //
                props.test.dispatch(notifNews(`comment '${value}' added to blog ${props.blog.title}`))
                setTimeout(() => {
                    props.test.dispatch(notifOff(''))
                }, 3000)
                props.blog.comments = props.blog.comments.concat(ablog)
                value = ''
            })
    }
  
    return (
        <div>
            <h1>blog app</h1>
      
            {props.blog ? 
                <div className="SingleStyle">
                    <h3>{props.blog.title}</h3>
                    <a href={props.blog.url} target="_blank" rel="noopener noreferrer">Lisätietoa: {props.blog.url}</a>
                    <h4>{props.blog.likes}{' '}
                        <button onClick={props.addLikes(props.blog.id)} className="likeButton">Add</button>
                        <button onClick={props.cancelLikes(props.blog.id)} className="cancelButton">Cancel</button><br/></h4>
                    <h4>{'added by '}{props.blog.user.name ? props.blog.user.name : 'Anonymous'}</h4>
                    <h2>Comments</h2>
                    <div>
                        <form onSubmit={addComment}>
                            <input 
                                type="text"  
                                name='comment' 
                                value={props.comment} 
                                onChange={handleChange}
                            />
                            <button >add comment</button>
                        </form>
                    </div>
                    {props.blog.comments.map((m, index) => 
                        <Represent com={m} key={m.id || m.comments.map(sm => sm.id)} />
                    )
                    }
                </div>  
                :
                ''
            }
        </div>
    )
}

export default TheBlog
