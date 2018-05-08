import React from 'react'
import Kolmas from './components/Kolmas'
import axios from 'axios'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {    
      notes: [],
      new: '',
      newName: '',
      value: false,
      test: '',
      collet:[],
      result: [
        {
        name: "Too many matches, specify another filter",
        numericCode: 1
      }
      ]
    }
    this.searchbox = this.searchbox.bind(this)
    this.show = this.show.bind(this)
    this.handleClick = this.handleClick.bind(this)
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
  
  //tapahtumakäsittelijä
  show = (e) => {
    const copy = e.target
   this.setState({
     newName : ''
   })
   const transf = this.state.newName.concat(copy.outerText)
   this.setState({
     newName : transf,
     value: true
   })
  }

  //Tapahtumakäsittelijä
  handleClick = (e) => {
    this.setState({
      collet : this.state.notes[this.state.notes.findIndex(f => f.name === e.target.outerText)]
    })
  }
  
  //renderointi
  render(){
    const search = this.state.notes.filter(s => s.name.toLowerCase().indexOf(this.state.new) !== -1) 
     
    const query = (search) =>{
      if (this.state.new.length === 0){
        return search
      } else if(search.length > 10) {
        return this.state.result
      } else if(this.state.listClicked) {
        return this.state.listClicked
      }else {
        return search
      }
    }
    //Renderoindaan käyttäjän klikkauksen yhteydessä
    if (this.state.value){
      return(
        <div>
          <Kolmas key={this.state.collet.id} props={this.state.collet}/>
        </div>
      )
    }
    //renderoidaan jos on käyttäjä etsia maita search box:ssa
    if (search.map(m => m.name).length === 1) {
      return (
        <div  >
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
    } else { // tavalllinnen renderointi
      return (
        <div  >
          <h3>Find Countries</h3>
          <form>
            Type Country Name: <input value={this.state.new} onChange={this.searchbox}/>
          </form> 
          <ol onClick={this.show}>
            {query(search).map(n => 
            <li key ={n.id} onClick={this.handleClick}>{n.name}</li>)}
          </ol>
        </div>
      )
    }
  }
}

export default App



