import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

const BlogForm = ({onSubmit, title, handleChange, author, url}) => {
    return(
        <div>
            <ControlLabel>create new</ControlLabel>
            <form onSubmit={onSubmit}>
                <FormGroup>
                    <div>
              title: 
                        <FormControl 
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
            author: 
                        <FormControl 
                            type="text"
                            name="author"
                            value={author}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
            url: 
                        <FormControl 
                            type="text"
                            name="url"
                            value={url}
                            onChange={handleChange}
                        />
                    </div>
                    <button>create</button>
                </FormGroup>
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