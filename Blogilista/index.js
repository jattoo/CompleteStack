const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(cors())

morgan.token('body', function(req, res) {
    const body = req.body
    return body
})

app.use(morgan('dev'))

const mongoUrl = 'mongodb://<user>:<pass>@ds147440.mlab.com:47440/bloklist'
mongoose.connect(mongoUrl)


//Ulkonäon formatointi
const looksAndFeel = (obj) => {
    return {
        id: obj._id,
        title: obj.title,
        author: obj.author,
        likes: obj.likes,
        url: obj.url
    }
}


const Blog = mongoose.model('Blog', {
    title: String,
    author: String,
    url: String,
    likes: Number
})

module.exports = Blog


app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(looksAndFeel))
    })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
    console.log('Adding: ',blog)

    blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
    
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

})
