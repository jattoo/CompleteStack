const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const blogRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


//yhteys kannan väliin muodestettään täällä
mongoose
    .connect(config.mongoUrl)
    .then(() => {
        console.log('Connection established to db', config.mongoUrl)
    })
    .catch(error => {
        console.log(error)
    })

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use(middleware.logger)


//controllers
app.use('/api/blogs', blogRouter)
app.use('/api/blogusers', usersRouter)
app.use('/api/login', loginRouter)

const server = http.createServer(app)


server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)

})

server.on('close', () => {
    mongoose.connection.close()
})

module.exports= {app, server}