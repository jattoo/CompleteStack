import React from 'react';
import ReactDOM from 'react-dom';

//Minulla pysyy tehtävä 1.10 samalaisenä kuin 1.9. Olen käyttänyt 
//sama tapahtumankäsittelijäfunktio kaikkissa tehtävissä 1.6 ylöspäin.


const Button = ({ handleClick, text }) => (
    < button onClick={handleClick} >
        {text}
    </button >

)



const OnMeillaTietoa = (props) => {
    return (
        <div>


            <table>
                <tbody>
                    <tr>
                        <th>STATISTIIKKA</th>
                    </tr>
                    <tr>
                        <td>{props.sana}</td>
                        <td>{props.hyva}</td>
                    </tr>
                    <tr>
                        <td>{'Huono: '}</td>
                        <td>{props.huono} </td>
                    </tr>
                    <tr>
                        <td>{'Neutraali: '}</td>
                        <td>{props.neutrali}</td>
                    </tr>
                    <tr>
                        <td> {'Keskiarvo: '}</td>
                        <td> {props.keskiarvo}</td>
                    </tr>
                    <tr>
                        <td>{'Positiivit: '}</td>
                        <td>{props.positiivit}{'%'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const Tyhja = () => {
    const vaihto = '\u00e4'
    return (
        <div>
            <h2>Statistiikka</h2>
            <h3>Ei yht{vaihto}{vaihto}n palautett{vaihto} annettu</h3>

        </div>

    )
}



class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            huono: 0,
            neutrali: 0,
            keskiarvo: 0,
            positiivit: 0,
            total: 1
        }
        this.hyvaPalauteet = this.hyvaPalauteet.bind(this)
        this.huonoPalauteet = this.huonoPalauteet.bind(this)
        this.neutraaliPalauteet = this.neutraaliPalauteet.bind(this)
    }

    hyvaPalauteet = (props) => {
        this.setState({
            hyva: this.state.hyva + 1,
            total: this.state.total + 1,
            keskiarvo: Math.round((this.state.total / 3) * 100) / 100,
            positiivit: Math.round((this.state.hyva / this.state.total) * 100)
        })

    }
    huonoPalauteet = () => {
        this.setState({
            huono: this.state.huono + 1,
            total: this.state.total + 1,
            keskiarvo: Math.round((this.state.total / 3) * 100) / 100,
            positiivit: Math.round((this.state.hyva / this.state.total) * 100)
        })
    }
    neutraaliPalauteet = () => {
        this.setState({
            neutrali: this.state.neutrali + 1,
            total: this.state.total + 1,
            keskiarvo: Math.round((this.state.total / 3) * 100) / 100,
            positiivit: Math.round((this.state.hyva / this.state.total) * 100)
        })
    }



    render() {
        const kaanos = "Hyv\u00e4"
        const total = this.state.total
        if (total <= 1) {
            return (
                <div>
                    <div>
                        <h1>{'ANNA PALAUTETTA'}</h1>
                    </div>
                    <div>
                        <Button
                            handleClick={this.hyvaPalauteet}
                            text={kaanos} total={this.state.total}
                        />
                        <Button
                            handleClick={this.huonoPalauteet}
                            text={'Huono'}
                        />
                        <Button
                            handleClick={this.neutraaliPalauteet}
                            text={'Neutraali'}
                        />
                    </div>
                    <div>
                        <Tyhja />
                    </div>
                </div>
            )
        } else {

            return (
                <div>
                    <div>
                        <h1>{'ANNA PALAUTETTA'}</h1>
                    </div>
                    <div>
                        <Button
                            handleClick={this.hyvaPalauteet}
                            text={kaanos} total={this.state.total}
                        />
                        <Button
                            handleClick={this.huonoPalauteet}
                            text={'Huono'}
                        />
                        <Button
                            handleClick={this.neutraaliPalauteet}
                            text={'Neutraali'}
                        />
                    </div>
                    <div>
                        <OnMeillaTietoa
                            sana={kaanos} hyva={this.state.hyva}
                            huono={this.state.huono} neutrali={this.state.neutrali}
                            keskiarvo={this.state.keskiarvo}
                            positiivit={this.state.positiivit}
                        />

                    </div>
                </div>
            )
        }


    }


}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)




