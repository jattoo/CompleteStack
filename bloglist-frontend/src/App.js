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
      password: '',
      title: '',
      author: '',
      url: ''
    }
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    console.log('user in the begining: ', this.state.user)
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    //blogilistan frontend, osa 2
    const userOnlinejSON = window.localStorage.getItem('currentUser')
    if (userOnlinejSON ){
      const user = JSON.parse(userOnlinejSON )

      this.setState({user})
      blogService.setToken(user.token)
    }

  } 

  addABlog = (e) =>{
    e.preventDefault()
    console.log('Adding new blog')
    const newBlog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }

    blogService
      .create(newBlog)
      .then(blog => {
        this.setState({
          blogs : this.state.blogs.concat(blog),
          title:'',
          author:'',
          url: ''
        })
      })
    console.log(newBlog)
  }
  
  //Yhteinen käsittelija fn joka asettaa arvot kentille silloin kun lisataa uuden blogin
  handleNoteBlogChanges = (e) => {
    this.setState({ [e.target.name] : e.target.value})
  }
  //sisään kirjautuminen tapahtumankäsittelija
  login = async (e) => {
    e.preventDefault()

    const user = await loginService.login({
      username: this.state.username,
      password: this.state.password
    })

    //blogilistan frontend, osa 2
    window.localStorage.setItem('currentUser', JSON.stringify(user))
    blogService.setToken(user.token)

    this.setState({
      username: '',
      password: '',
      user
    })
  
    console.log('user after login: ', this.state.user)
  }

  //Ulos kirjautuminen tapahtumankäsittelijä
  logout = (e) => {
    e.preventDefault()
    window.localStorage.clear()
    window.location.reload(true)
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
        <p>{this.state.user.name} logged in <button onClick={this.logout}>logout</button></p>
      </div>
    )

    const makeAblogForm = () => (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.addABlog}>
        <div>
          title: 
            <input 
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleNoteBlogChanges}
            />
        </div>
        <div>
        author: 
          <input 
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleNoteBlogChanges}
          />
      </div>
      <div>
        url: 
        <input 
          type="text"
          name="url"
          value={this.state.url}
          onChange={this.handleNoteBlogChanges}
        />
      </div>
      <button>create</button>
      </form>
    </div>
    )
   
    return (
      <div>
        {this.state.user === null ? 
         loginForm() :
         <div>
          {blogForm()}
          {this.state.blogs.map(blog => blog._id ? 
          <Blog key={blog._id} blog={blog}/> :
          <Blog key={blog.id} blog={blog}/>
        )}
          {makeAblogForm()}
          </div>
        }
      </div>
      
          
    )
  }
}


export default App;
