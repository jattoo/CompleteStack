import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>

)

const Statistiikka = (props) => {

    return (
        <div>
            {'Keskiarvo: '} {props.keskiarvo}{<br />}
            {'Positiivit: '} {props.positiivit} {'%'}
        </div>

    )
}

const Statistics = (props) => {
    return (
        <div>
            {props.sana} {props.hyva}{<br />}
            {'Huono: '} {props.huono} {<br />}
            {'Neutraali: '} {props.neutrali}{<br />}
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

    hyvaPalauteet = () => {
        this.setState({
            hyva: this.state.hyva + 1,
            total: this.state.total + 1,
            keskiarvo: Math.round((this.state.total / 3) * 100) / 100,
            positiivit: (this.state.hyva / this.state.total) * 100
        })

    }
    huonoPalauteet = () => {
        this.setState({
            huono: this.state.huono + 1,
            total: this.state.total + 1,
            keskiarvo: Math.round((this.state.total / 3) * 100) / 100,
            positiivit: (this.state.hyva / this.state.total) * 100
        })
    }
    neutraaliPalauteet = () => {
        this.setState({
            neutrali: this.state.neutrali + 1,
            total: this.state.total + 1,
            keskiarvo: Math.round((this.state.total / 3) * 100) / 100,
            positiivit: (this.state.hyva / this.state.total) * 100
        })
    }


    render() {
        const kaanos = "Hyv\u00e4"

        return (
            <div>
                <div>
                    <h1>{'ANNA PALAUTETTA'}</h1>
                </div>
                <div>
                    <Button
                        handleClick={this.hyvaPalauteet}
                        text={kaanos}
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
                    <h3>STATISTIIKKA</h3>
                    <Statistics
                        sana={kaanos} hyva={this.state.hyva}
                        huono={this.state.huono} neutrali={this.state.neutrali}
                    />
                    <Statistiikka keskiarvo={this.state.keskiarvo}
                        positiivit={this.state.positiivit}
                    />
                </div>
            </div>
        )
    }


}






ReactDOM.render(
    <App />,
    document.getElementById('root')
)




