import React from 'react';
import ReactDOM from 'react-dom';



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
        })
        this.statistiikka()

    }
    huonoPalauteet = () => {
        this.setState({
            huono: this.state.huono + 1,
            total: this.state.total + 1,
            keskiarvo: Math.round((this.state.total / 3) * 100) / 100,

        })
        this.statistiikka()
    }
    neutraaliPalauteet = () => {
        this.setState({
            neutrali: this.state.neutrali + 1,
            total: this.state.total + 1,
            keskiarvo: Math.round((this.state.total / 3) * 100) / 100,
        })
        this.statistiikka()
    }

    statistiikka = () => {
        const newValue = (this.state.hyva / this.state.total) * 100
        if ((this.state.huono < 1) && (this.state.neutrali < 1)) {
            this.setState({
                positiivit: 100

            })
        } else {
            this.setState({
                positiivit: newValue

            })
        }

    }

    render() {
        return (
            <div>
                <div>
                    <h1>{'ANNA PALAUTETTA'}</h1>
                </div>
                <button onClick={this.hyvaPalauteet} > HYVAA</button>
                <button onClick={this.huonoPalauteet}>HUONO</button>
                <button onClick={this.neutraaliPalauteet}>NEUTRALI</button>
                {<br />}
                {<br />}

                <div>
                    <h3>{'STATISTIIKKA'}</h3>
                    {'Hyv\u00e4\u00e4: '} {this.state.hyva}{<br />}
                    {'Huono: '} {this.state.huono}{<br />}
                    {'Neutraali: '} {this.state.neutrali}{<br />}
                    {'Keskiarvo: '} {this.state.keskiarvo}{<br />}
                    {'Positiivisia: '} {this.state.positiivit} {'%'}
                </div>

            </div>
        )
    }


}






ReactDOM.render(
    <App />,
    document.getElementById('root')
)




