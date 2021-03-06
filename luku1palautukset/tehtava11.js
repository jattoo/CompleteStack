import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
}

const Sisalto = (props) => {
    return (
        <p>{props.osa}{props.tehtavia}</p>
    )
}

const Yhteensa = (props) => {
    return (
        <p>{props.sana1} {props.kaikki} {props.sana2}</p>
    )
}


const App = () => {
    const kurssi = "Half Stack -sovelluskehitys"
    const osa1 = "Reactin perusteet "
    const tehtavia1 = 10
    const osa2 = "Tiedonv\u00e4litys propseilla "
    const tehtavia2 = 7
    const osa3 = "Komponenttien tila "
    const tehtavia3 = 14
    const yheensa = tehtavia1 + tehtavia2 + tehtavia3
    const sana1 = 'yhteens\u00e4'
    const sana2 = 'teht\u00e4v\u00e4\u00e4'
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto osa={osa1} tehtavia={tehtavia1} />
            <Sisalto osa={osa2} tehtavia={tehtavia2} />
            <Sisalto osa={osa3} tehtavia={tehtavia3} />
            < Yhteensa sana1={sana1} kaikki={yheensa} sana2={sana2} />
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'));
