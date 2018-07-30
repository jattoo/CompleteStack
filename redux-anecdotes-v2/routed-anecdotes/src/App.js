import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'
import { Table, FormGroup, FormControl, ControlLabel, Button, Alert,
        Navbar, Grid, NavbarBrand, NavItem, Nav, MenuItem, NavDropdown, 
        Row, Message, Image,Col, Thumbnail } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Steve_Jobs from './images/Steve_Jobs.jpg'

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>

    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </div>
)

const Note = ({note}) => {
  return(
  <div>
    <h2>{note.content}</h2>
    <div>{note.user}</div>
    <div><strong>{note.important? 'tärkeä' : ''}</strong></div>
  </div>
)}

const Notes = ({notes}) => (
  <div>
    <h2>Notes</h2>
    <Table striped>
      <tbody>
        {notes.map(note=>
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </td>
            <td>
              {note.user}
            </td>
          </tr>
        )}
      </tbody>
    </Table>  
  </div>
)

const Users = ({notes}) => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>  
  </div>
)

const Login = ({onLogin, history}) => {
  const onSubmit = (e) => {
    e.preventDefault()
    onLogin(e.target.username.value)
    history.push('/')
  }
  return (
  <div>
    <h2>login</h2>
    <form onSubmit={onSubmit}>
      <FormGroup>
        <ControlLabel>username:</ControlLabel>
        <FormControl 
          type='text'
          name='username'
        />  
        <ControlLabel>password:</ControlLabel>
        <FormControl
          type='password'
        />             
        <Button bsStyle="success" type='submit'>login</Button>
      </FormGroup>
    </form>
  </div>
)}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <Grid>
      <Row>
        <Col xs= {6} md={4}>
        <b>
          <em>An anecdote is a brief, revealing account of an individual person or an incident. 
              Occasionally humorous, anecdotes differ from jokes because their primary purpose 
              is not simply to provoke laughter but to reveal a truth more general than the brief 
              tale itself, such as to characterize a person by delineating a specific quirk or trait, 
              to communicate an abstract idea about a person, place, or thing through the concrete 
              details of a short narrative. An anecdote is "a story with a point."
          </em>
          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </b>
        </Col>
        <Col xs={6} md={4}>
          <Thumbnail src={Steve_Jobs}  responsive />
        </Col>
      </Row>
    </Grid>
  </div>
)
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: [
        {
          id: 1,
          content: 'HTML on helppoa',
          important: true,
          user: 'Matti Luukkainen'
        },
        {
          id: 2,
          content: 'Selain pystyy suorittamaan vain javascriptiä',
          important: false,
          user: 'Matti Luukkainen'
        },
        {
          id: 3,
          content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
          important: true,
          user: 'Arto Hellas'
        }
      ],
      user: null,
      message: ''
    }
  }

  login = (user) => {
    this.setState({ user, message: `welcome ${user}` })
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000);
  }

  render() {
    
    const noteById = (id) =>
      this.state.notes.find(note => note.id === Number(id)) 

    const style = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    const userOnline = this.state.user
        ? <em>{this.state.user} logged in</em>
        : 'login'
    return (
      <div className='container'>        
        <Router>
          <div>
            {(this.state.message &&
              <Alert color="success">
                {this.state.message}
              </Alert>
            )}

            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  Anecdote App                
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <LinkContainer to="/">
                    <NavItem>
                     home
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/notes">
                    <NavItem>
                      notes
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/users">
                  <NavItem>
                    users
                  </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>
                      { userOnline }
                    </NavItem>       
                  </LinkContainer>   
                  <LinkContainer to="/about">
                    <NavItem>
                      about
                    </NavItem>       
                  </LinkContainer>                 
                </Nav>  
              </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/notes" render={() => <Notes notes={this.state.notes}/>} />
            <Route exact path="/notes/:id" render={({match}) => 
              <Note note={noteById(match.params.id)} />}
            />            
            <Route path="/users" render={() => 
              this.state.user 
                ? <Users />
                : <Redirect to="/login" />
              }/>
            <Route path="/login" render={({history}) => 
              <Login history={history} onLogin={this.login}/>} 
            />
            <Route path="/about" render={() =>
              <About />
             } />
          </div>
        </Router>
        <div style={style}>
          <br />
          <em>Note app, Department of Computer Science 2018</em>
        </div> 
      </div>
    )
  }
}

export default App