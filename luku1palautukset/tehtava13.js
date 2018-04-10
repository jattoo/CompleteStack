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
    const osa2 = "Tiedonv\u00e4litys propseilla "
    const tehtavia2 = 7
    const osa3 = "Komponenttien tila"
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
        <p>{props.sana1} {props.kaikki} {props.sana2}</p>
    )
}


const App = () => {
    const kurssi = "Half Stack -sovelluskehitys"

    //Nämä kaksi muuttujat laitoin että sivu tulostaa
    //utf-8 merkit oikein
    const sana1 = 'Yhteens\u00e4'
    const sana2 = 'teht\u00e4v\u00e4\u00e4'

    const Osa1 = {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    }
    const Osa2 = {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    }
    const Osa3 = {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }
    const YhteenLasku = (luku) => {
        const ensim = Osa1.tehtavia
        const toinen = Osa2.tehtavia
        const kolmas = Osa3.tehtavia
        const yhteensa = ensim + toinen + kolmas

        return yhteensa
    }
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto />
            < Yhteensa sana1={sana1} kaikki={<YhteenLasku />} sana2={sana2} />
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'));
