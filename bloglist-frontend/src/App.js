import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    console.log('user in the begining: ', this.state.user)
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  login = async (e) => {
    e.preventDefault()

    const user = await loginService.login({
      username: this.state.username,
      password: this.state.password
    })
    this.setState({
      username: '',
      password: '',
      user
    })
    console.log('user after login: ', this.state.user)
  }

  handleChanges = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  render() {
    const loginForm = () => (
      <div>
        <h1>Log into application</h1>

        <form onSubmit={this.login}>
          <div>
            <div>
            Username: 
              <input 
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChanges}
              />
            </div>
            <div>
              Password: 
              <input 
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChanges}
              />
            </div>
            <button>Login</button>
        </div>
        </form>

      </div>
    )

    const blogForm = () => (
      <div>
        <h2>blogs</h2>
        <p>{this.state.user.name} logged in</p>
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    )


    return (
      <div>
        {this.state.user === null ? 
          loginForm() :
          blogForm()}
      </div>
    )
  }
}

export default App;

