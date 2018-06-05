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


//tapahtumakäsittelija joka palautta kaikki
blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(looksAndFeel))
    })
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