import React from 'react'

const name = [
  {
    id: 1,
    name: 'Arto Hellas',
  }
]


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: name,
      newName: '',
      numero: ''
    }
    this.lisaaNimi = this.lisaaNimi.bind(this)
    this.kasitele = this.kasitele.bind(this)
  }

  kasitele = (e) => {
    this.setState({
      newName: e.target.value
    })

  }

  addNumber = (e) => {
    e.preventDefault()
    this.setState({
      numero : e.target.value
    })
  }


  voiLisata = (now, s, w) => {
   if (!now.find(f => f.name === s)){
     this.setState({ persons : w})
   }
     
  }

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
    
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit = {this.lisaaNimi}>
          <div>
            <b>Nimi:</b> <input value = {this.state.newName} onChange={this.kasitele}/>
          </div>
          <div>
            <b>Numero:</b> <input value = {this.state.numero} onChange ={this.addNumber}/> 
          </div>
          <div>
            <button type="submit" ><b>Lisää</b></button>
          </div>
        </form>
        <div>
        <h2>Numerot</h2>
        {this.state.persons.map(p => <b><p key = {p.id}>{p.name} {p.numero}</p></b>)}
        </div>
      </div>
    )
  }
}


export default App
