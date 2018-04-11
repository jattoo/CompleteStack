import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const kurssi = {
        nimi: "Half Stack -sovelluskehitys",

        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonv\u00e4litys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ],


    }
    const Kaikki = () => {
        const yhteensa = kurssi.osat[0].tehtavia + kurssi.osat[1].tehtavia + kurssi.osat[2].tehtavia
        const sana1 = 'Yhteens\u00e4'
        const sana2 = 'teht\u00e4v\u00e4\u00e4'
        return (
            <div>
                <h1>{kurssi.nimi}</h1>
                <p>{kurssi.osat[0].nimi} {kurssi.osat[0].tehtavia}</p>
                <p>{kurssi.osat[1].nimi} {kurssi.osat[1].tehtavia}</p>
                <p>{kurssi.osat[2].nimi} {kurssi.osat[2].tehtavia}</p>
                <p>{sana1} {yhteensa} {sana2}</p>
            </div>
        )

    }
    return (
        <div>
            <Kaikki />
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'));
