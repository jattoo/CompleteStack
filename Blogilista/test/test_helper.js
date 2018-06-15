const Blog = require('../models/note')

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
const format = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
        url: blog.url
    }
}


//functio palauttaa kaikki blogit
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(format)
} 


module.exports = { originBlogs, format, blogsInDb}
