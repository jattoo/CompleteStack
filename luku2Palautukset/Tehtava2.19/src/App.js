import React from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import './index.css'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {    //Tila 
      persons: [],
      newName: '',
      numero: '',
      canRender: '',
      error: null
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
      this.setState({ persons: response})
      })
     
  }

 
  takeDown = (id) => {
    return() => {
      const note = this.state.persons.find(f => f.id === id)
      const changedContak = {...note}
      if (window.confirm(`Poistetaanko ${note.name}`) === true){
        noteService
          .upDate(id, changedContak)
          .then(res => {
            const notes = this.state.persons.filter(n => n.id !== id)
            
            this.setState({
              persons: notes,
              error: `Poistettiin ${note.name}`
            })
          })
      } 
        
        
    } 
    
  }

  //tapahtuman käsittelija funktio palauttaa joko muokkattu kontaki luettelloon
  //tai se lisää aivan uuden kontaktin luetteloon. 
  lisaaNimi = (e) => {
    e.preventDefault()
      const name = this.state.persons.find(m => m.name === this.state.newName )
      
      
      if (name){
        if (window.confirm(`${name.name} on jo luettettelossa, korvataanko vanha numero uudella?`) === true){
          const theRest = this.state.persons.filter(f => f.name !== this.state.newName)
          const taulukko = {
            name: this.state.newName,
            number: this.state.numero
          }
          const id = `${name.id}`
          noteService
            .editNumber(id, taulukko)
            .then(response => {
              this.componentDidMount
              this.setState({
                persons: theRest.concat(response),
                error: `Vaihdettiin henkilo ${name.name}'n puh. numeron`, 
                newName: '',
                numero: ''
              })
            })
            .catch(error => {
              this.setState({
                error: `${name.name} is no longer in the system`
              })
      
            })
        } 
      }else if (!name){
        const taulukko ={
          name: this.state.newName,
          number: this.state.numero
        }
        noteService
          .newPerson(taulukko)
          .then(res => {
            this.setState({
              persons: this.state.persons.concat(res),
              error: 'Lisattiin '+this.state.newName, 
              newName: '',
              numero:''
            })
          })

      } 
        
       
      
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
        <Notification viestit={this.state.error} />
        
        <form onSubmit = {this.lisaaNimi}>
         <div>
            <b>Rajaa Näytettävä Nimi: </b> 
            <input 
            onChange={this.showMe}/><br/>
            <br/>
        </div>
            
        <div>
         <h2> <b>Lisää Uusi / Muuta Olemassaolevan numeroa </b></h2><br/>
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
        <b>{decision.map(p => <Note 
        key = {p.id} 
        note={p}
        takeDown={this.takeDown(p.id)}
        />
        )}</b>
        </div>
      </div>
    )
  }
}


export default App



