import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>{
    const req = axios.get(baseUrl)
    return req.then(res => {return res.data})
}

const newPerson = (obj) =>{
    const req = axios.post(baseUrl, obj)
    return req.then(res => res.data)
}

export default {getAll, newPerson}
