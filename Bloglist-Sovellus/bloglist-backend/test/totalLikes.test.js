const Blog = require('../models/note')
const User = require('../models/user')

const originBlogs = [
    {
        'title': 'Microsoft has acquired github for $7.5B in stock',
        'author': 'Frederick Larinois, Ingrid Lunden',
        'likes': 5919,
        'url': 'https://tcrn.ch/2Li8eje'

    },
    {
        'title': 'Google\'s Hangouts Meet will soon be compatible with hardware from polycom and cisco',
        'author': 'Frederick Larinois',
        'likes': 300,
        'url': 'https://tcrn.ch/2HjWxpC'
    }
]

//funktio palauttaa kaikki blogit
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(Blog.format)
} 

//kayttajien palauttamaa funktio
const usersInDb = async () => {
    const users = await User.find({})
    return users
}

module.exports = { originBlogs, blogsInDb, usersInDb}
