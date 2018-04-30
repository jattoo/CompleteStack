import React from 'react'


const Kurssi = ({ kurssi }) => {
    return (
        <div >
            <h2>{kurssi.nimi}</h2>
            <h3>{kurssi.osat.map(k2 => <p key = {k2.id}> {k2.nimi} {k2.tehtavia}</p>)}</h3>
            <h3>{'Yhteensä'} {kurssi.osat.reduce((nyt, yht) => nyt + yht.tehtavia, 0)} {'tehtäviä'}</h3>  
        </div>
    )
}
export default Kurssi