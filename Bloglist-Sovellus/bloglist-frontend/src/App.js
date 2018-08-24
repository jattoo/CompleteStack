import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from  './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router,Route, Link } from 'react-router-dom'
import {  Navbar, NavItem, Nav, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import userService from './services/users'

const TheBlog = ({blog, usernow, logout, addLikes, cancelLikes}) => {
  console.log(blog)
  return (
    <div>
      <h1>blog app</h1>
      <p>{usernow} logged in <button onClick={logout}>logout</button></p>
      {blog ? 
      <div className="SingleStyle">
        <h3>{blog.title}</h3>
        <a href={blog.url} target="_blank">{blog.url}</a>
        <h4>{blog.likes}{' '}
          <button onClick={addLikes(blog.id)} className="likeButton">Add</button>
          <button onClick={cancelLikes(blog.id)} className="cancelButton">Cancel</button><br/></h4>
        <h4>{'added by '}{blog.user.name ? blog.user.name : 'Anonymous'}</h4>

      </div>  
      :
      <div>
        {'none'}
      </div>
    }
    </div>
  )
}

const TestBlog = (props) => {
  return(
    <div >
      <h1>blog app</h1>
      <p>{props.userNow} logged in <button onClick={props.logout}>logout</button></p>
      {props.addingblogs}
      {props.blog.map(bl => 
        <div key={bl.id}>
          <Link to={`/blogs/${bl.id}`}><h3 className='blogStyle'>{bl.title} {bl.author}</h3></Link>
        </div>
      )}
    </div>
  )
}

const UserView = ({userNow, logout, users, addingblogs}) => {
  console.log()
   return (   
    <div>
      <h1>blog app</h1>
      <p>{userNow} logged in <button onClick={logout}>logout</button></p>
      <br />
      {addingblogs}
      <h2>users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
              <th>blog added</th>
          </tr>
        </thead>
              {users.map(user =>
              <tbody>
                <tr key={user.id}>
                  <td >
                    <Link to={`/users/${user.id}`}>{user.name} </Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              </tbody>
          )}
      </Table>
    </div>
   )
}

const UsersBlog = (props) => {
  const blogs= []
  props.user === undefined ? 
  props.allUsers.map(blog => blog.find(m => m.id === props.id))
     :
  props.user.blogs.map(blog => blogs.push({ blog }))
  console.log('blogs: ',blogs.map(b => b.blog._id))
  if(props.user === undefined){  
    return(
        <div>
          <h1>blog app</h1>
          <p>{props.userNow} logged in <button onClick={props.logout}>logout</button></p>
          <h2>{props.allUsers.name}</h2>
          <h2>{'Added blogs'}</h2>
            {blogs.map(blog =>
              <div key={blog.blog._id}>
                <li>{blog.blog.title}</li>
              </div>
            )}
          </div>
      )
  } else if(props.user !== undefined) {
    return (
      <div>
        <h1>blog app</h1>
        <p>{props.userNow} logged in <button onClick={props.logout}>logout</button></p>
        <h2>{props.user.name}</h2>
        <h2>{'Added blogs'}</h2>
          {blogs.map(blog =>
            <div key={blog.blog._id}>
              <li>{blog.blog.title}</li>
            </div>
          )}
      </div>
    )}

  }

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
      store: [],
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
    console.log('user in the begining: ', this.state.user)
    //
    userService.getAll().then(user => {
      this.setState({
        allUsers: user
      })
    })

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
    console.log('user: ', userOnlinejSON)
    if (userOnlinejSON ){
      const user = JSON.parse(userOnlinejSON)

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
   // e.preventDefault()
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
      console.log('Username: ',poistettava.user.name)
      
      if (poistettava.user.name === undefined) {
      
        
        if(window.confirm(`delete ${poistettava.title} by ${'anonymous'} ?`) === true){
          const loput = this.state.blogs.filter(fm => fm.title !== poistettava.title)
          //varmuuden vuoden vuoksi kopioidaan muut blogit ja tallentaa niitä 
          //varastossa
          this.setState({
            store: this.state.store.push(loput)
          })

          blogService
            .deLete(id, poistettava)
            .then(res => {
              this.setState({
                blogs: loput,
                notifs: `Poistettiin ${poistettava.title}`
              })
            })
            .catch(error =>{
              this.setState({
                error: `${poistettava.title} is no longer here`
              })
            })
            setTimeout(() => {
              this.setState({
                error: null
              })
            }, 5000);
        }
      }
      console.log('the store name:', this.state.store)
    }
    
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
    const userById= (id) => {
      return this.state.allUsers.find(user => user.id === id)
    }
    const blogById = (id) => {
      return this.state.blogs.find(blog => blog.id === id)
    }
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
          <Notification msg={this.state.notifs} />
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
      <Router>
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
                </Nav>  
              </Navbar.Collapse>
            </Navbar>
          <Route exact path="/" render={() =>
            <TestBlog 
              userNow={this.state.user.name}
              logout={this.state.logout}
              blog={this.state.blogs}
            />
          }/>
          <Route exact path="/blogs" render={() => 
            <TestBlog 
              userNow={this.state.user.name}
              logout={this.logout}
              blog={this.state.blogs}
              addingblogs={makeAblogForm()}
            />}/>
          <Route exact path="/blogs/:id" render={({match}) => 
            match.params.id === 'undefined' ?
            ''
            :
            <TheBlog 
              blog={blogById(match.params.id)} 
              usernow={this.state.user.name}  
              logout={this.logout}
              addLikes={this.addLikes}
              cancelLikes={this.cancelLikes}
            />}
          />
          <Route exact path="/users" render={() => 
            <UserView 
              userNow={this.state.user.name} 
              logout={this.logout}
              users={this.state.allUsers}
              addingblogs={makeAblogForm()}
            />} />
            <Route exact path="/users/:id" render={({match}) =>
              match.params.user === 'undefined' ? 
              <UserView 
                userNow={this.state.user.name} 
                logout={this.logout}
                users={this.state.allUsers}
              />
              :
              <UsersBlog 
                user={userById(match.params.id)}  
                allUsers={this.state.allUsers}
                userNow={this.state.user.name}
                logout={this.logout}
              />
            } />
           
        </div>
      </Router>
      </div>
    )
  }
}


export default App;