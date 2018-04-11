import React from 'react';
import ReactDOM from 'react-dom';


const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
}



const Sisalto = (props) => {
    return (
        <div>
            <p>{props.osa} {props.tehtavia}</p>
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
    const Osat = [
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
    ]
    const YhteenLasku = (luku) => {
        const ensim = Osat[0].tehtavia
        const toinen = Osat[1].tehtavia
        const kolmas = Osat[2].tehtavia
        const yhteensa = ensim + toinen + kolmas

        return yhteensa
    }

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto osa={Osat[0].nimi} tehtavia={Osat[0].tehtavia} />
            <Sisalto osa={Osat[1].nimi} tehtavia={Osat[1].tehtavia} />
            <Sisalto osa={Osat[2].nimi} tehtavia={Osat[2].tehtavia} />
            <Yhteensa sana1={sana1} kaikki={<YhteenLasku />} sana2={sana2} />
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'));
