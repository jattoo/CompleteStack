const blogRouter = require('express').Router()
const Blog = require('../models/note')
const User = require('../models/user')

//blogilistan testit, osa 1
blogRouter.get('/', async (req, res) => {
    const kaikkiBlokit = await Blog
        .find({})
        .populate('user', {username : 1, name: 1})
    res.json(kaikkiBlokit.map(Blog.format))
})


//blogilistan testit, osa 2
blogRouter.post('/', async (req, res) => {
    try {
        const body = req.body

        const user = await User.findById(body.userId)
        const blog = new Blog({
            title: body.title,
            author : body.author,
            likes : body.likes,
            url : body.url,
            user : user._id
        })
        //blogilistan testit, osa 4
        if (blog.title === undefined && blog.url === undefined){
            return res.status(400).send({error : 'title and url absent'})
        } else {
            const savedBlogs = await blog.save()
            return res.json(Blog.format(blog))
        }
    }catch(exception) {
        console.log(exception)
        res.status(500).json({error : 'Bra something fought back..'})
    }
})

//blogilistan laajennus, osa 2
blogRouter.delete('/:id', async (req, res) => {
    try{
        await Blog.findByIdAndRemove(req.params.id)
        res.status(400).end()
    }catch (exception){
        console.log(exception)
        res.status(400).send({error : 'Oh bra don\'t like your id format'})
    }
})

//blogilistan laajennus, osa 3
blogRouter.put('/:id', async (req, res) => {
    const body = req.body
    const blog = {
        likes : body.likes
    }
    try {
        
        await Blog.findByIdAndUpdate(req.params.id, blog , {new : true})
        const resp = await blog
        res.json(resp)
    } catch (exception) {

        console.log(exception)
        res.status(400).send({ error: 'bad request!'})
    }
    
})
module.exports=blogRouter