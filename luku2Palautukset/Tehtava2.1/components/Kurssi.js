import React from 'react'

const Kurssi = ({ kurssi }) => {
    const subject = kurssi.nimi
   
    
    
    return (
        <div> 
            <div>
                {<h1>{subject}</h1>}
            </div>
            {
                kurssi.osat.map((kursit) =>
                        <h3 key = {kursit.id}>
                            {kursit.nimi} {kursit.tehtavia}
                        </h3>
                   )
            }
        </div>
    )
}

export default Kurssi