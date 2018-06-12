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


//blogilistan testit, osa 2
blogRouter.post('/', async (req, res) => {
    try {
        const body = req.body
        const blog = new Blog({
            title: body.title,
            author : body.autho,
            likes : body.likes,
            url : body.url
        })
        const savedBlogs = await blog.save()
        res.json(looksAndFeel(blog))
    }catch(exception) {
        console.log(exception)
        res.status(500).json({error : 'Bra something fought back..'})
    }
})


module.exports=blogRouter