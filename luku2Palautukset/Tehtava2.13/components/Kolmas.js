import React from 'react'

const Kolmas = ({props}) => {
    return (
      <div>
        <h1>{props.name} {props.nativeName}</h1>
        <h3>{"Capital: "} {props.name}</h3>
        <h3>{"Population: "} {props.population}</h3>
        <div width={50} height={50}>
        <img alt={props.name +'\'s flag'} src={props.flag}/>
        </div>
      </div>
      
    )
}

export default Kolmas
