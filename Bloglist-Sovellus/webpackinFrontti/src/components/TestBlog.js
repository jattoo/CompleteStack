import React from 'react'
import {   ListGroup, ListGroupItem } from 'react-bootstrap'
import { BrowserRouter as Router,Route, Link } from 'react-router-dom'


const TestBlog = (props) => {
    return(
        <div >
            {props.addingblogs}
            {props.blog.map((bl, index) => 
                <div key={bl.id || index}>
                    <ListGroup>
                        <ListGroupItem>
                            <Link to={`/blogs/${bl.id}`}><h3>{bl.title} {bl.author}</h3></Link>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            )}
        </div>
    )
}

export default TestBlog
