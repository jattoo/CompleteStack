const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/note')


//käyttäjien tarkistuksen varten
usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({})
        .populate('blog', {likes: 1, author: 1, title: 1, url: 1}) //haettaan sopivat kohteet
    res.json(users.map(User.format))
})

//käyttäjien lisääminsen varten
usersRouter.post('/', async (req, res) => {
    try{
        const body = req.body
        
        //blogilistan laajennus, osa 5
        //salasanan pituuden tarkistelua varten
        const passLen = body.password.split('')
        //Olemassa olevan käyttäjän hakua
        const existingUser = await User .find({ username: body.username})

        if(passLen.length < 3 && existingUser.length > 0){
            return res.status(400).send({error : 'password and username un satisfactory'})
        
        }else if (passLen.length < 3 ){
            return res.status(400).send({ error : 'password too short..Tips!: Use a longer password'})
        
        } else if (existingUser.length > 0){
            return res.status(400).send({error : 'Oops that username is taken...try a different one.'})
        }
        
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        let adult

        //blogilistan laajennus, osa 5
        if (body.adult === undefined){
            adult = true
        } else {
            adult = body.adult > 18 ? true : false
        }

        //const blog = await Blog.findById

        const user = new User({
            username: body.username,
            name: body.name,
            password: passwordHash,
            adult: adult,
            blog: body.blog
        })

        const savedUser = await user.save()

        res.json(savedUser)
    } catch (exception) {
        console.log(exception)
        res.status(500).json({ error : 'something went wrong...'})
    }
})

module.exports = usersRouter