import React from 'react'
import Note from './components/Note'
import axios from 'axios'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {    
      notes: [],
      newNote: '',
      showAll : true
    }
    console.log("Test 1: Contructor")
  }

  componentWillMount(){
    console.log("Test 2: ComponentWillmount")
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        this.setState({ notes: response.data})
      })
  }

  

  render(){
    return (
      <div>
        <h3>PUHELINLUETTELO</h3>
        <ul>
          {this.state.notes.map(n => 
          <Note key={n.id} note={n} />)}
        </ul>
      </div>
    )
  }
}

export default App



