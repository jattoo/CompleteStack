import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const keskiarvo = () => {
    const arvot = (
      store.getState().good + 
      store.getState().ok + 
      store.getState().bad) / 3
    return Math.round(arvot * 10) / 10
  }
  
  
  const positiivisia = () => {
    const divisor = store.getState().good + store.getState().ok +  store.getState().bad
    let prosentit, total
    if (divisor <= 0 ){
      prosentit = 0
    } else {
      total = store.getState().good * 100 / divisor
      prosentit =  Math.round(total * 10) / 10
    }
   
    return prosentit 
  }


const Statistiikka = () => {
    
    let palautteita = keskiarvo() < 0.5 ? 0 : 1

    
    if (palautteita === 0) {
        return (
            <div>
                <h2>statistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }
    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{store.getState().good}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{store.getState().ok}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{store.getState().bad}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td>{keskiarvo()}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{positiivisia()}{' %'}</td>
                    </tr>
                </tbody>
            </table>
            <div className= "destroy">
                <button onClick={ e => window.location.reload(true)}>nollaa tilasto</button>
            </div>
        </div >
    )
}

class App extends React.Component {

    klik = (nappi) => () => {
        switch (nappi) {
            case 'GOOD':
                return store.dispatch({ type: 'GOOD' })
            case 'OK':
                return store.dispatch({ type: 'OK' })
            case 'BAD':
                return store.dispatch({ type: 'BAD' })
            default:
                return store.dispatch()
        }
    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>
                <Statistiikka  />
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}
renderApp()
store.subscribe(renderApp)
