import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
}


const Osa = (props) => {
    return (
        <p>{props.nimi} {props.snimi}</p>
    )
}

const Sisalto = (props) => {
    const osa1 = "Reactin perusteet "
    const tehtavia1 = 10
    const osa2 = "Tiedonv‰litys propseilla "
    const tehtavia2 = 7
    const osa3 = "Komponenttien tila "
    const tehtavia3 = 14

    return (
        <div>
            <Osa nimi={osa1} snimi={tehtavia1} />
            <Osa nimi={osa2} snimi={tehtavia2} />
            <Osa nimi={osa3} snimi={tehtavia3} />
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <p>yhteens‰ {props.kaikki} teht‰v‰‰</p>
    )
}


const App = () => {
    const kurssi = "Half Stack -sovelluskehitys"
    const tehtavia1 = 10
    const tehtavia2 = 7
    const tehtavia3 = 14
    const yheensa = tehtavia1 + tehtavia2 + tehtavia3
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto />
            < Yhteensa kaikki={yheensa} />
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'));
