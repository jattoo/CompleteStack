import React from 'react';
import ReactDOM from 'react-dom';



const Button = ({ handleClick, text }) => (
    < button onClick={handleClick} >
        {text}
    </button >

)




const Tyhja = (props) => {
    let tv
    for (let i = 0; i <= props.arr.length; i++) {
        tv = props.arr[Math.floor(Math.random() * props.arr.length)]

    }
    return (
        <div>
            <h3>{tv}</h3>

        </div>

    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0
        }

    }



    sanoJotain = () => {
        this.setState({
            selected: this.state.selected + 1
        })

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
                        <Tyhja arr={anecdotes} />
                    </div>
                    <div>
                        <Button
                            handleClick={this.sanoJotain}
                            text={'Next Anekdootti'}
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




