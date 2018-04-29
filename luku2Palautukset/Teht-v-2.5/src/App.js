import React from 'react'
import Kurssi from './components/Kurssi'

//Tehtävä 2.5 pysyy samana kuin tehtävä 2.4
//Komponentti kurssi exporttaa itsensä nimellä Kurssi 
// Componenti App importtaa käyttöön komponentti Kurssi

const App = () => {
    
    const kurssit = [
      {
        nimi: 'Half Stack -sovelluskehitys',
        id: 1,
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10,
            id: 1
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7,
            id: 2
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14,
            id: 3
          }
        ]
      },
      {
        nimi: 'Node.js',
        id: 2,
        osat: [
          {
            nimi: 'Routing',
            tehtavia: 3,
            id: 1
          },
          {
            nimi: 'Middlewaret',
            tehtavia: 7,
            id: 2
          }
        ]
      }
    ]
    
    
    return (
        <div>
          {
            <Kurssi kurssi = {kurssit}/>
          }
        </div>
    )
}

export default App