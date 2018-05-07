import React from 'react'

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
      canRender: '',
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
    this.setState({
      canRender: e.target.value.substr(0,20)
    })
    
    
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
        <b>{decision.map(p => <p key = {p.id}>{p.name} {p.numero}</p>)}</b>
        </div>
      </div>
      )
    }
}


export default App