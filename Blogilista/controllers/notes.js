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
            author : body.author,
            likes : body.likes,
            url : body.url
        })
        //blogilistan testit, osa 4
        if (blog.title === undefined && blog.url === undefined){
            res.status(400).send({error : 'title and url absent'})
        } else {
            const savedBlogs = await blog.save()
            res.json(looksAndFeel(blog))
        }
    }catch(exception) {
        console.log(exception)
        res.status(500).json({error : 'Bra something fought back..'})
    }
})

blogRouter.delete('/:id', async (req, res) => {
    try{
        await Blog.findByIdAndRemove(req.params.id)
        res.status(400).end()
    }catch (exception){
        console.log(exception)
        res.status(400).send({error : 'Oh bra don\'t like your id format'})
    }
})

module.exports=blogRouter