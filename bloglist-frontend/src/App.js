import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from  './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


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
      url: '',
      notifs: ''
    }
    this.addABlog = this.addABlog.bind(this)
    this.logout = this.logout.bind(this)
    this.handleChanges = this.handleChanges.bind(this)
    this.handleNoteBlogChanges = this.handleNoteBlogChanges.bind(this)
    this.addLikes = this.addLikes.bind(this)
    this.cancelLikes = this.cancelLikes.bind(this)

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
          notifs : `a new blog '${this.state.title}' by ${this.state.author} added`,
          title:'',
          author:'',
          url: ''
        })
      })
      setTimeout(() => {
        this.setState({
          notifs : null
        })
      }, 5000);
      
    
  }
  
  //Yhteinen käsittelija fn joka asettaa arvot kentille silloin kun lisataan uuden blogin
  handleNoteBlogChanges = (e) => {
    this.setState({ [e.target.name] : e.target.value})
  }
  //sisään kirjautuminen tapahtumankäsittelija
  login = async (e) => {
    try{
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
  } catch(exception){
    this.setState({
      notifs : 'wrong username or password'
    })
    setTimeout(() => {
      this.setState({
        notifs: null
      })
    }, 3000);
  }
    console.log('user after login: ', this.state.user)
  }

  //Ulos kirjautuminen tapahtumankäsittelijä
  logout = (e) => {
    e.preventDefault()
    window.localStorage.clear()
    
    this.setState({
      notifs: 'Successfully logging you out'
    })
    setTimeout(() => {
      this.setState({
        notifs : null
      })
      window.location.reload(true)
    }, 3000);
    
  }


  //Ei ollut tehtävä annossa. Huvin vuoksi lisääsin sen tykkäyksen peruttamisen varten
  cancelLikes = (id) => {
    return () => {
    const twistedBlog = this.state.blogs.find(blog => blog.id === id)
    twistedBlog.likes = twistedBlog.likes - 1
    
    blogService
      .handleLikes(id, twistedBlog)
      .then(() => {
        this.setState({
          blogs: this.state.blogs.map(blog => blog.id !== id ? blog : twistedBlog)
        })
      })

    }
  }



  addLikes = (id) => {
    return () => {
      //Haetaan kannasta etsimmamme blogin ja tallennetaan siitä muuttujaan
      //Muutujan otettaan käyttöön blogservice funktiossa
      let twistedBlog = this.state.blogs.find(blog => blog.id === id) 
      //sen tykkayksen arvon nostetaan nappin painalusta.     
      twistedBlog.likes =  twistedBlog.likes + 1

      blogService
        .handleLikes(id, twistedBlog)
        .then(() => {
          this.setState({
            //käydään lappi koko blogit ja jos ei ole sama kuin meidän blogin niin
            //voidaan palauttaa sen kuin se on muuten palautetaan muokattu versiomme
            blogs: this.state.blogs.map(blog => blog.id !== id ? blog : twistedBlog)
          })
        })
    }
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
        <h2>Blogs</h2>
        <p>{this.state.user.name} logged in <button onClick={this.logout}>logout</button></p>
      </div>
    )

    //Otettaan togglable komponentin käyttöön täällä.
    const makeAblogForm = () => (
      <Togglable buttonLabel="Add New Blog" >
        <BlogForm 
          visible={this.visible}
          onSubmit={this.addABlog}
          title={this.state.title}
          handleChange={this.handleNoteBlogChanges}
          author={this.state.author}
          url={this.state.url}
        />
      </Togglable>
    )

    return (
      
      <div>
       {}
        <Notification msg={this.state.notifs} />
        {this.state.user === null ? 
         loginForm() :
         <div >
          {blogForm()}
          {this.state.blogs.map(blog =>
          <Blog key={blog.id || blog._id} 
            title={blog.title}
            author={blog.author}
            likes={blog.likes}
            url={blog.url}
            username={blog.user.name}
            id = {blog.id}
            addLikes={this.addLikes}
            cancelLikes={this.cancelLikes}
          /> 
          
        )}
         
          {makeAblogForm()}
          </div>
        }
      </div>
      
          
    )
  }
}


export default App;
