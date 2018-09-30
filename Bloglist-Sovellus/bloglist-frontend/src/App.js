import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from  './components/Notification'
import { notifNews, notifOff } from './reducers/notifReducer'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import {  HashRouter, Route } from 'react-router-dom'
import {  Navbar, NavItem, Nav, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import userService from './services/users'
import { connect } from 'react-redux'
import { blogInit, updateBlog, cancelAlike } from './reducers/blogReducer'
import SimpleBlog from './components/SimpleBlog'
import { userInit } from './reducers/userReducer'
import { loginInit } from './reducers/loginReducer'
import PropTypes from 'prop-types'
import Footer from './components/Footer'
import TheBlog from './components/TheBlog'
import TestBlog from './components/TestBlog'
import UserView from './components/UserView'
import UsersBlog from './components/UsersBlog'

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
            notifs: '',
            poistot: [],
            allUsers: []
        }
        this.addABlog = this.addABlog.bind(this)
        this.logout = this.logout.bind(this)
        this.handleChanges = this.handleChanges.bind(this)
        this.handleNoteBlogChanges = this.handleNoteBlogChanges.bind(this)
        this.addLikes = this.addLikes.bind(this)
        this.cancelLikes = this.cancelLikes.bind(this)
    }
 
    componentDidMount() {
        //console.log('user in the begining: ', this.state.user)
        const { store } = this.context
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
  
        userService.getAll().then(user => {
            this.setState({
                allUsers: user
            })
        })

    
        this.props.blogInit()
        this.props.userInit()
        this.props.loginInit()
        blogService.getAll().then(blogs =>{
            //blogilistan frontend, osa 8
            // määrritellaan taulukkon tulevan prosessien käyttöön.
            let deepCopy = []
            let highestLikes = 1
            let lowest = 300
            //etsittaan blogista enemmän tykkätty blogin ja vähintään tykätty
            blogs.map(b => b.likes > highestLikes ?  highestLikes = b.likes : highestLikes = highestLikes)
            blogs.map(b => b.likes < lowest ?  lowest = b.likes : lowest = lowest)
      
            //while loopin varten tehdään sen manuaalisesti aloitus ja lopetus paikkat
            let startingPoint = highestLikes + 1
            const stoppingPoint = lowest - 1

            //whilen avulla kerrättään blogit ja sijoitettaan aikaisemmin luotu taulukkoon
            while (startingPoint > stoppingPoint){
                blogs.map(m => m.likes === startingPoint ? deepCopy.push(m) : '')
                startingPoint = startingPoint - 1
            }
            this.setState({ 
                blogs : this.state.blogs.concat(deepCopy)
            })}
        )

        //blogilistan frontend, osa 2
        const userOnlinejSON = window.localStorage.getItem('currentUser')
        //console.log('user: ',  userOnlinejSON)
        if (userOnlinejSON ){
            const user = JSON.parse(userOnlinejSON)
            //console.log('user: ',  user.name)
            this.setState({user})
            blogService.setToken(user.token)
        }
    } 

    componentWillUnmount() {
        this.unsubscribe()
    }


  addABlog = (e) =>{
      e.preventDefault()
      //console.log('Adding new blog')
      const newBlog = {
          title: this.state.title,
          author: this.state.author,
          url: this.state.url,
          likes: 0
      }

      blogService
          .create(newBlog)
          .then(blog => {
              this.context.store.dispatch(notifNews(`a new blog ${this.state.title} by ${this.state.author} added`))
              setTimeout(() => {
                  this.context.store.dispatch(notifOff(''))
              }, 3000)
              this.setState({
                  blogs : this.state.blogs.concat(blog),
                  title:'',
                  author:'',
                  url: ''
              })
        
        
          })
  }

  //Yhteinen käsittelija fn joka asettaa arvot kentille silloin kun lisataan uuden blogin
  handleNoteBlogChanges = (e) => {
      this.setState({ [e.target.name] : e.target.value})
  }
  //sisään kirjautuminen tapahtumankäsittelija
  login = async (e) => {
      //console.log('login pressed')
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
          }, 3000)
      }
      //console.log('user after login: ', this.state.user)
  }

  //Ulos kirjautuminen tapahtumankäsittelijä
  logout = (e) => {
      // e.preventDefault()
      window.localStorage.clear()
      this.context.store.dispatch(notifNews('Successfully logging you out'))
      setTimeout(() => {window.location.reload(true)}, 3000)
  }

  //poistotoimintoa jos lisääjä on anonymous käyttäjä. 
  //Refaktoroin backendin että antaa kuka tahansa poista lisäämällä if clausit seuraavalla tavall
  /*
    if(blog.user === undefined){
          await blog.remove()
      } else {
        //tai sitten käyttäjä on määritelty tee tässä sulussa olevat koodit
      }
 */
  poistoToiminto = (id) => {
      return () => {
          const poistettava = this.state.blogs.find(fp => fp.id === id)
          //console.log('Username: ',poistettava.user.name)
      
          if (poistettava.user.name === undefined) {
      
        
              if(window.confirm(`delete ${poistettava.title} by ${'anonymous'} ?`) === true){
                  const loput = this.state.blogs.filter(fm => fm.title !== poistettava.title)
                  //varmuuden vuoden vuoksi kopioidaan muut blogit ja tallentaa niitä 
                  //varastossa
                  this.setState({
                      poistot: this.state.poistot.push(loput)
                  })

                  blogService
                      .deLete(id, poistettava)
                      .then(res => {
              
                          this.setState({
                              blogs: loput
                          })
                      })
                  this.context.store.dispatch(notifNews(`Poistettiin ${poistettava.title}`))
                  setTimeout(() => {
                      this.context.store.dispatch(notifOff(''))
                  }, 3000)
              }
          }
          //console.log('the poistot name:', this.state.poistot)
      }
    
  }

  //Ei ollut tehtävä annossa. Huvin vuoksi lisääsin sen tykkäyksen peruttamisen varten
  cancelLikes = (id) => {
      return async () => {
          const twistedBlog = this.context.store.dispatch(cancelAlike(id))
          //niin ei haluta talletta enää käntään
          /*await blogService
              .handleLikes(id, twistedBlog)*/
      }
  }



  addLikes = (id) => {
      return async () => {
          const twistedBlog= this.context.store.dispatch(updateBlog(id))
          //niin ei haluta talletta enää käntään
          /* await blogService
              .handleLikes(id, twistedBlog)*/
      }
  }
  handleChanges = (e) => {
      this.setState({
          [e.target.name] : e.target.value
      })
  }



  render() {
      const userById= (id) => {
          //console.log('userById: ',this.context.store.getState().user.find(user => user.id === id))
          return this.context.store.getState().user.find(user => user.id === id)
      }
      const blogById = (id) => {
          const test = this.context.store.getState().blogs.find(blog => blog.id === id)
          //test? console.log('test: ',test) : ''
          return this.context.store.getState().blogs.find(blog => blog.id === id)
      }
    
      const sortedBlogs = this.context.store.getState().blogs.sort(function(a, b){ return  b.likes - a.likes})
      //console.log('sortedbolgs: ',sortedBlogs)
      let stateUser 
    
    
     
      this.context.store.getState().login === null ? 
          stateUser = 'none':
          stateUser = this.context.store.getState().login.name
    
    
    
      const loginForm = () => (
          <LoginForm
              visible={this.state.visible}
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleNoteBlogChanges}
              handleSubmit={this.login}
          />
      )

      const blogForm = () => (
          <div>
              <p>{this.state.user.name} logged in <button onClick={this.logout}>logout</button></p>
          </div>
      )

    
      const home = () => (
          <div>
        
              {}
              <Notification msg={this.context.store.getState().notif} />
              {this.state.user === null ?
                  <div className ="login">
                      <h1>Log into application</h1>
                      {loginForm()}
                  </div>
                  :
                  <div className="blogtosee">
                      {blogForm()}
                      {makeAblogForm()}
                      {this.state.blogs.map(blog => 
                      //Tähän olen päätynyt koska olen poistanut aikaisemat blogit ennen käyttäjän 
                      //lisääminen. Tämän jälkeen sovellus ei käynistynyt kun manuaalisesti lisääsin
                      //mongon kautta uudet blogit. Päädyin tähän ratkaisun
            
                          blog.user.name === undefined || blog.user.name === this.state.user.name ?  
                              <Blog key={blog.id || blog._id} 
                                  title={blog.title}
                                  author={blog.author}
                                  likes={blog.likes}
                                  url={blog.url}
                                  username= {'anonymous'}
                                  id = {blog.id}
                                  addLikes={this.addLikes}
                                  cancelLikes={this.cancelLikes}
                                  poisto={this.poistoToiminto}
                              /> 
                              :
                              <Blog key={blog.id || blog._id} 
                                  title={blog.title}
                                  author={blog.author}
                                  likes={blog.likes}
                                  url={blog.url}
                                  username= {blog.user.name}
                                  id = {blog.id}
                                  addLikes={this.addLikes}
                                  cancelLikes={this.cancelLikes}
                                  poisto={this.poistoToiminto}
                              /> 
                      )}
                  </div>
              }
          </div>
      )

      //Otettaan togglable komponentin käyttöön täällä.
      const makeAblogForm = () => (
          <Togglable buttonLabel="create new" >
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
      if (this.state.user === null ){
          return (
              <div>
                  {home()}
              </div>
        
          )
      }
      return (
          <div className='container'>
              <HashRouter>
                  <div>
                      <Navbar inverse collapseOnSelect>
                          <Navbar.Header>
                              <Navbar.Brand>
                                    TheBlog
                              </Navbar.Brand>
                              <Navbar.Toggle />
                          </Navbar.Header>
                          <Navbar.Collapse>
                              <Nav>
                                  <LinkContainer to="/blogs">
                                      <NavItem>
                                            Blogs
                                      </NavItem>
                                  </LinkContainer>
                                  <LinkContainer to="/users">
                                      <NavItem>
                                            Users
                                      </NavItem>
                                  </LinkContainer>
                                  <NavItem>
                                      {stateUser} logged in <Button bsStyle='success' onClick={this.logout}>logout</Button>
                                  </NavItem>
                              </Nav>  
                          </Navbar.Collapse>
                      </Navbar>
            
                      <Route exact path="/" render={() =>
                          <div>
                              <Notification msg={this.context.store.getState().notif} />
                              <TestBlog 
                                  blog={sortedBlogs}
                                  addingblogs={makeAblogForm()}
                              />
                          </div>
                      }/>
                      <Route exact path="/blogs" render={() =>
                          <div> 
                              <Notification msg={this.context.store.getState().notif} />
                              <TestBlog 
                                  blog={sortedBlogs}
                                  addingblogs={makeAblogForm()}
                              />
                          </div>
                          
                      }/>
                      <Route exact path="/blogs/:id" render={({match}) => 
                      
                          match.params.id === 'undefined' ?
                              ''
                              :
                              <div>
                                  <Notification msg={this.context.store.getState().notif} />
                                  <TheBlog 
                                      blog={blogById(match.params.id)} 
                                      addLikes={this.addLikes}
                                      cancelLikes={this.cancelLikes}
                                      onSubmit={this.addComment}
                                      allblogs={this.context.store.getState().blogs}
                                      test={this.context.store}
                                  /></div>
                      }
            
                      />
                      <Route exact path="/users" render={() => 
                          <UserView 
                              users={this.context.store.getState().user}
                              view={<Notification msg={this.context.store.getState().notif} />}
                          />} />
                      <Route exact path="/users/:id" render={({match}) =>
                          match.params.user === 'undefined' ? 
                              <UserView 
                                  users={this.context.store.getState().user}
                              />
                              :
                              <UsersBlog 
                                  user={userById(match.params.id)}  
                                  allUsers={this.context.store.getState().user}
                              />
                      } />
                      <Footer />
            
                  </div>
              </HashRouter>
          </div>
      )
  }
}

App.contextTypes = {
    store: PropTypes.object
}

export default connect(
    null,
    { blogInit, userInit, loginInit }
)(App)