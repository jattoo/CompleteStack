const blogRouter = require('express').Router()
const Blog = require('../models/note')



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

//blogilistan testit, osa 1
blogRouter.get('/', async (req, res) => {
    const kaikkiBlokit = await Blog.find({})
    res.json(kaikkiBlokit.map(looksAndFeel))
})


//tapahtumakäsittelija joka lisää blogit
blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
    
})

module.exports=blogRouter