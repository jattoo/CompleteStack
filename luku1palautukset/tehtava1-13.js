import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button
        onClick={handleClick}>
        {text}
    </button>
)


class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: 0,
            lause: '',
            count: 0,
            kaikki: []

        }
        this.voting = this.voting.bind(this)
        this.sanoJotain = this.sanoJotain.bind(this)
    }

    voting = () => {
        let sum = 0
        for (let i in this.state.kaikki) {
            if (this.state.kaikki[i] === this.state.lause) {
                sum += 1
                this.setState({
                    count: sum
                })
            }
        }


    }

    sanoJotain = () => {
        let tv
        for (let i = 0; i <= anecdotes.length; i++) {
            tv = anecdotes[Math.floor(Math.random() * anecdotes.length)]

            this.setState({
                selected: this.state.selected + 1,
                kaikki: this.state.kaikki.concat(tv),
                lause: tv

            })
        }
    }


    render() {



        const aloitus = this.state.selected
        if (aloitus === 0) {
            return (
                <div>
                    <div>
                        <Button
                            handleClick={this.sanoJotain}
                            text={'Show Anekdootti'}
                        />

                    </div>

                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        {this.state.lause}{<br />}
                        {<br />}
                        {'has'} {this.state.count} {'votes'}
                    </div>
                    <div>
                        <Button
                            handleClick={this.sanoJotain}
                            text={'Next Anekdootti'}
                        />
                        <Button
                            handleClick={this.voting}
                            text={'vote'}
                        />
                    </div>


                </div>
            )
        }
    }
}
const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the " +
    " development time...The remaining 10 percent of the code accounts for the other" +
    " 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write" +
    " code that humans can understand ",
    "Debugging is twice as hard as writing the code in the first place." +
    " Therefore, if you write the code as cleverly as possible, you are, by definition," +
    " not smart enough to debug it.",
    "Every good work of software starts by scratching a developer's personal itch.",
    "Program testing can be used to show the presence of bugs, but never to show" +
    " their absence!",
    "A primary cause of complexity is that software vendors uncritically adopt almost" +
    " any feature that users want."
]


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)




