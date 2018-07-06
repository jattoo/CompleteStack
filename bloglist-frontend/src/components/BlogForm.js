import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({onSubmit, title, handleChange, author, url}) => {
    return(
        <div>
        <h2>create new</h2>
        <form onSubmit={onSubmit}>
        <div>
          title: 
            <input 
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
        </div>
        <div>
        author: 
          <input 
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
      </div>
      <div>
        url: 
        <input 
          type="text"
          name="url"
          value={url}
          onChange={handleChange}
        />
      </div>
      <button>create</button>
      </form>
    </div>
    )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}
export default BlogForm