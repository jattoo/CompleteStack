import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            huono: 0,
            neutrali: 0,
        }

    }

    hyvaPalauteet = () => {
        this.setState({
            hyva: this.state.hyva + 1,

        })

    }
    huonoPalauteet = () => {
        this.setState({
            huono: this.state.huono + 1
        })
    }
    neutraaliPalauteet = () => {
        this.setState({
            neutrali: this.state.neutrali + 1
        })
    }



    render() {
        return (
            <div>
                <div>
                    <h1>{'ARVOKAS ASIAKAS ANNA PALAUTETTA'}</h1>
                </div>

                <button onClick={this.hyvaPalauteet}>HYVAA</button>
                <button onClick={this.huonoPalauteet}>HUONO</button>
                <button onClick={this.neutraaliPalauteet}>NEUTRALI</button>
                {<br />}
                {<br />}

                <div>
                    <h3>{'UNICAFEEN ASIAKAS PALAUTE STATISTIIKKA'}</h3>
                    {'Hyv\u00e4\u00e4: '} {this.state.hyva}{<br />}
                    {'Huono: '} {this.state.huono}{<br />}
                    {'Neutraali: '} {this.state.neutrali}{<br />}
                </div>

            </div>
        )
    }


}






ReactDOM.render(
    <App />,
    document.getElementById('root')
)




