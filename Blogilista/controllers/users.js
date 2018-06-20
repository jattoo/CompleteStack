const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


//käyttäjien tarkistuksen varten
usersRouter.get('/', async(req, res) => {
    const users = await User.find({})
    res.json(users.map(User.format))
})

//käyttäjien lisääminsen varten
usersRouter.post('/', async(req, res) => {
    try{
        const body = req.body

        const saltRounds = 10
        console.log(body.password)
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const adult = body.adult > 18 ? true : false

        const user = new User({
            username: body.username,
            name: body.name,
            password: passwordHash,
            adult: adult
            
        })

        const savedUser = await user.save()

        res.json(savedUser)
    } catch (exception) {
        console.log(exception)
        res.status(500).json({ error : 'something went wrong...'})
    }
})

module.exports = usersRouter