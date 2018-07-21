import React from 'react'
import Note from './components/Note'
import noteService from './services/notes'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {    //Tila 
      persons: [],
      newName: '',
      numero: '',
      canRender: '',
    }
    //fuktioiden bindit
    this.lisaaNimi = this.lisaaNimi.bind(this)
    this.kasitele = this.kasitele.bind(this)
    this.addNumber = this.addNumber.bind(this)
    this.showMe = this.showMe.bind(this)
  }

  
  componentDidMount(){
    
    noteService
      .getAll()
      .then(response => {
        //console.log(response.data)
        this.setState({ persons: response})
      })
     
  }

  lisaaNimi = (e) => {
    e.preventDefault()
    const taulukko = {
      name: this.state.newName,
      number: this.state.numero,
    }

    noteService
      .newPerson(taulukko)
      .then(res => {
        this.setState({
          persons: this.state.persons.concat(res),
          newName: '',
          numero:''
        })
      })

  }
  
    //funktio lisää uusi käyttäjä
    kasitele = (e) => {
      this.setState({
        newName: e.target.value
      })

    }

  //Funtio lisää puhnumeron
  addNumber = (e) => {
    e.preventDefault()
    this.setState({
      numero : e.target.value
    })
  }

 
  //funktio palauttaa arvon jos käyttäjä tekee etsintoja
  showMe = (e) => {
    e.preventDefault()
    this.setState({
      canRender: e.target.value.substr(0,20)
    })
    
    
  }

 
  
  handleNoteChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNote: event.target.value })
  }

  




  render(){
    const showResults = this.state.persons.filter(f => f.name.toLowerCase().indexOf(this.state.canRender) !== -1)
    const decision = showResults ? showResults : this.state.persons
    
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit = {this.lisaaNimi}>
         <div>
            <b>Rajaa Näytettävä Nimi: </b> 
            <input 
            onChange={this.showMe}/><br/>
            <br/>
        </div>
            
        <div>
          <b>Lisää Uusi Nimi: </b><br/>
          <br/>
            
          <b>Nimi:</b> 
          <input value = {this.state.newName}  onChange={this.kasitele}/>
        </div>
            
        <div>
            <b>Numero:</b> 
            <input value = {this.state.numero}  onChange ={this.addNumber}/> 
        </div>
            
        <div>
          <br/>
            <button type="submit" ><b>Lisää</b></button>
        </div>
        </form>
        <div>
        <h2>Numerot</h2>
        <b>{decision.map(p => <Note key = {p.id} note={p}/>)}</b>
        </div>
      </div>
    )
  }
}


export default App



