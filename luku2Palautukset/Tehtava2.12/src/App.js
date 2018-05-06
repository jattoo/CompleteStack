import React from 'react'
import Note from './components/Note'
import Kolmas from './components/Kolmas'
import axios from 'axios'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {    
      notes: [],
      new: '',
      result: [
        {
        name: "Too many matches, specify another filter",
        numericCode: 1
      }
      ]
    }
    this.searchbox = this.searchbox.bind(this)
  }

  componentWillMount(){
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        this.setState({ notes: response.data})
      })
  }
  searchbox = (e) => {
    this.setState({
      new: e.target.value.substr(0,20)
    })
  }

  render(){
    const search = this.state.notes.filter(s => s.name.toLowerCase().indexOf(this.state.new) !== -1) 
    const query = (search) =>{
      if (this.state.new.length === 0){
        return search
      } else if(search.length > 10) {
        return this.state.result
      } else {
        return search
      }
    }
    if (search.map(m => m.name).length === 1) {
      return (
        <div>
          <h3>Find Countries</h3>
          <form>
            Type Country Name: <input value={this.state.new} onChange={this.searchbox}/>
          </form> 
          <ol>
            {query(search).map(n => 
            <Kolmas key={n.numericCode} props={n} />)}
          </ol>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Find Countries</h3>
          <form>
            Type Country Name: <input value={this.state.new} onChange={this.searchbox}/>
          </form> 
          <ol>
            {query(search).map(n => 
            <Note key={n.numericCode} note={n} />)}
          </ol>
        </div>
      )
    }
  }
}

export default App



