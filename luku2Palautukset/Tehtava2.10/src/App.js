import React from 'react'
import Note from './components/Note'
import Kolmas from './components/Kolmas'

//täällä on meidän taulukko
const name = [
  {
    id: 1,
    name: '',
    
  }
]


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {    //Tila 
      persons: name,
      newName: '',
      numero: '',
      canRender: false,
      safeHouse: []
    }
    //fuktioiden bindit
    this.lisaaNimi = this.lisaaNimi.bind(this)
    this.kasitele = this.kasitele.bind(this)
    this.addNumber = this.addNumber.bind(this)
    this.showMe = this.showMe.bind(this)
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

  //Funktio antaa logiikka ja yleis toimintoja uuden käyttäjän lisääminen 
  
  voiLisata = (now, s, w) => {
   if (!now.find(f => f.name === s)){
     this.setState({ persons : w})
   }
     
  }

  //funktio palauttaa arvon jos käyttäjä tekee etsintoja
  showMe = (e) => {
    e.preventDefault()
    const kasitelty = this.state.persons.filter(f => f.name === e.target.value)
    if (e.target.value.length > 0){
      if (this.state.persons.filter(f => f.name === e.target.value)){
        this.state.safeHouse.pop(0)
        const finaali = this.state.safeHouse.concat(kasitelty)
        this.setState({
          safeHouse : finaali,
          canRender: true
        })
      }
    }
    
  }

  //Uuden käyttäjän tiedon kerääminen ja lisääminen 
  lisaaNimi = (e) => {
    e.preventDefault()
    const taulukko = {
      name : this.state.newName,
      id: this.state.persons.length + 1,
      numero : this.state.numero
    }
    const lisatavaNimi = this.state.persons.concat(taulukko)
    this.voiLisata(this.state.persons, this.state.newName, lisatavaNimi)
  }
  
  render() {
    //Tilapainen renderointi
    if (this.state.canRender){
      return (
        <div>
          <h2>Puhelinluettelo</h2>
          <form onSubmit = {this.lisaaNimi}>
            <div>
              <b>Rajaa Näytettävä Nimi: </b> 
              <input  onChange={this.showMe}/><br/>
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
              <input value = {this.state.numero} onChange ={this.addNumber}/> 
            </div>
            
            <div>
            <br/>
              <button type="submit" ><b>Lisää</b></button>
            </div>
          </form>
          <div>
          <h2>Numerot</h2>
          <b>{this.state.safeHouse.map(sf => <Note key = {sf.id} note = {sf}/>)}</b>
          </div>
        </div>
      )
    } else {
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
          <b>{this.state.persons.map(p => <Kolmas key={p.id} props={p}/>)}</b>
          </div>
        </div>
      )
    }

    }
    
    
}


export default App
