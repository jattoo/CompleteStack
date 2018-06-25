import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (inComingToken) => {
  token = `bearer ${inComingToken}`
}

export default { getAll, setToken}