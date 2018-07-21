const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')


loginRouter.post('/', async (req, res) => {
    //pyynön tuleva dataa haettaan tähän
    const body = req.body

    //etsitaan kannasta pynnön mukana tullut datan username
    const user = await User.findOne({ username: body.username})


    //varmistettaan salasana bcrypt kirjaston avulla
    const realPassWord = user === null ?
        false :
        await bcrypt.compare(body.password, user.password)

    //jos vaarilla tiedoilla yritettään kirjautua, niin palautuu kaksi eri vastausta
    if  (!(user && realPassWord)){
        return res.status(401).json({ error : 'Wrong credentials!'})
    }

    //grneroidaan tokenit pynntö tiedosta ja talettaa ne tähän jos kaikki hyvin
    const userToken = {
        username : user.username,
        id: user._id
    } 

    //allekirjoitettaan jwt kirjastolla
    const token = jwt.sign(userToken, process.env.SECRET)

    res.status(200).send({token, username : user.username, name: user.name })

})

module.exports = loginRouter