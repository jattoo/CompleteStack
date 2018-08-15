const blogRouter = require('express').Router()
const Blog = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const token = require('../utils/middleware')


//blogilistan testit, osa 1
blogRouter.get('/', async (req, res) => {
    const kaikkiBlokit = await Blog
        .find({})
        .populate('user', {username : 1, name: 1})
    res.json(kaikkiBlokit.map(Blog.format))
})


//blogilistan testit, osa 2
blogRouter.post('/', async (req, res) => {
    const body = req.body
    try {
        
        
        const decoded = jwt.verify(req.token, process.env.SECRET)
        console.log('id: ', decoded.id)
        //jos tokenit eivät ole tai ovat vaarin
        if(!token || !decoded.id){
            return res.status(401).json({ error: 'no tokens or tokens invalid!'})
        }
        //blogilistan testit, osa 4
        else if (body.title === undefined || body.url === undefined){
            return res.status(400).send({error : 'title and url absent'})
        } else {
            const user = await User.findById(decoded.id)
            const blog = new Blog({
                title: body.title,
                author : body.author,
                likes : body.likes || 0,
                url : body.url,
                user : user._id
            })
            const savedBlogs = await blog.save()
            user.blog = user.blog.concat(savedBlogs._id)

            await user.save()
            res.status(201).json(savedBlogs)
        }
    }catch(exception) {
        //debuggausta varten
        if(exception.name === 'JsonWebTokenError'){
            res.status(401).json({ error : exception.message})
        } else {
            console.log(exception)
            res.status(500).json({error : 'Bra something fought back..'})
        }
    }
})

//blogilistan laajennus, osa 2
blogRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(blog.user === undefined){
        await blog.remove()
    } else 
    {
        try {
            const token = req.token
            const decodedToken = jwt.verify(token, process.env.SECRET)
       
            if (!token || !decodedToken.id) {
                return res.status(401).json({ error: 'token missing or invalid' })
            }
    
            console.log(blog.user, decodedToken.id)

            if (decodedToken.id.toString() !== blog.user.toString()) {
                return res.status(400).json({ error: 'only creator can delete a blog' })
            }

            if (blog) {
                await blog.remove()
            }
    
            res.status(204).end()
        } catch (exception) {
            if (exception.name === 'JsonWebTokenError') {
                res.status(401).json({ error: exception.message })
            } else {
                console.log(exception)
                res.status(500).json({ error: 'something went wrong...' })
            }
        }}
    
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
