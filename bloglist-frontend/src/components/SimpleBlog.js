import React from 'react'
//Componentti on vaan luotu testin varten
const SimpleBlog = ({ blog, onClick}) => {
   return ( 
    <div className="wrapper">
        <div className="titleAndAuthor">
            {blog.title} {blog.author}
        </div>
        <div className="likees">
            blog has {blog.likes} likes
            <button onClick={onClick}>like</button>
        </div>
    </div>
   )
}

export default SimpleBlog