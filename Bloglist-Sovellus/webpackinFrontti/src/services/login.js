import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
    const res = await axios.post(baseUrl, credentials)
    window.location.reload(true)
    return res.data
}

export default { login }
