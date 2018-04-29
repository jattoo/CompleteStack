import React from 'react'


const Kurssi = ({ kurssi }) => {
    const results = () => kurssi.map(kursit => 
        <div>
            <h3 key ={kursit.id}>
                {kursit.nimi}
                {kursit.osat.map(k => 
                <p key ={k.id}>
                    {k.nimi} {k.tehtavia}                
                </p>
            )}
           </h3>
           <h4>
            {'Yhteensä '} 
            {kursit.osat.reduce((nyt, yht) =>
                 nyt +yht.tehtavia , 0
                )
            }
            {' Tehtäviä'}
            </h4>
        </div>
    )
  
    return (
        <div > 
            <h1>{'Opetusohjelma'}</h1>
            {results()}
        </div>
    )
}
export default Kurssi