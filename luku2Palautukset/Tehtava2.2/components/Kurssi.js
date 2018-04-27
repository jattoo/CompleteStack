import React from 'react'

const Kurssi = ({ kurssi }) => {
    const subject = kurssi.nimi
    

    const results = () => kurssi.osat.map((kursit) =>
        <h3 key = {kursit.id}>
            {kursit.nimi} {kursit.tehtavia}
        </h3>
    )
    
    const yhteensa = () => kurssi.osat.reduce((nyt, yht) =>
       nyt+ yht.tehtavia, 0
    )

    return (
        <div> 
            <div>
                {<h1>{subject}</h1>}
            </div>
            {results()}
            {'Yhteensä'} {yhteensa()} {'tehtävää'}
        </div>
    )
}
export default Kurssi