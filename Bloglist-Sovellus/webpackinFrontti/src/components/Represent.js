import React from 'react'

const Represent = ({com}) => {
    const divStyle= {
        color: '#3d09e5'
    }

    if ( typeof com.comments === 'object'){
        return(
            <div>{
                com.comments.map(comob =>
                    <div key={comob.id}> 
                        <ul>
                            <li style={divStyle}>{comob.comments}</li>
                        </ul> </div>)
            }
            </div>
        )
    }
    return(
        <div key={com.id}>
            <ul>
                <li  style={divStyle}>{com.comments}</li>
            </ul>
        
        </div>
    )
}

export default Represent
