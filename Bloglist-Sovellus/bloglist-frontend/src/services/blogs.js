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

const create = async (obj) => {
  const config = {
    headers: { 'Authorization' : token}
  }
  const res = await axios.post(baseUrl, obj, config)
  return res.data
}

const handleLikes = async (id, blog) => {
  const res = await axios.put(`${baseUrl}/${id}`, blog)
  return res.data
}

const deLete = async (id, blog) => {
  const res = await axios.delete(`${baseUrl}/${id}`, blog)
  return res.data
}

const coMment = async (id, obj) => {
  const res = await axios.put(`${baseUrl}/${id}`,obj)
  return res.data
}
export default { getAll, setToken, create, handleLikes, deLete, coMment }