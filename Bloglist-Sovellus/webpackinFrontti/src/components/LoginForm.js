import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
    return (
        <div>
            <ControlLabel>Log into app</ControlLabel>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <div>
                        <div>
            Username: 
                            <FormControl 
                                type="text"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
              Password: 
                            <FormControl 
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </div>
                        <button>Login</button>
                    </div>
                </FormGroup>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm
