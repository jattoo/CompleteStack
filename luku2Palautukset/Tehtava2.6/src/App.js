import React from 'react'

const name = [
  {
    id: 1,
    name: 'Arto Hellas'
  }
]


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: name,
      newName: ''
    }
  }

  kasitele = (e) => {
    this.setState({
      newName: e.target.value
    })
  }

  lisaaNimi = (e) => {
    e.preventDefault()
    const taulukko = {
      name : this.state.newName,
      id: this.state.persons.length + 1
    }

    const lisatavaNimi = this.state.persons.concat(taulukko)

    this.setState ({
      persons : lisatavaNimi
    })
    
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit = {this.lisaaNimi}>
          <div>
            Nimi: <input value = {this.state.newName} onChange={this.kasitele}/>
          </div>
          <div>
            <button type="submit" >lisää</button>
          </div>
        </form>
        <div>
        <h2>Numerot</h2>
        {this.state.persons.map(p =><p key ={p.id}>{p.name}</p>)}
        </div>
      </div>
    )
  }
}


export default App