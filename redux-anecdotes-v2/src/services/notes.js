import axios from 'axios'
const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(url)
    return res.data
}

const createAnecdote = async (content) => {
    const res = await axios.post(url, { content, votes: 0 })
    return res.data
}
const updateAnecdotes = async (id, anecdote) => {
    const content = anecdote.content
    const res = await axios.put(`${url}/${id}`,{ content, votes: anecdote.votes + 1 })
    return res.data

}
export default { getAll, createAnecdote, updateAnecdotes }