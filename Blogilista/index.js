const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const blogRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')


if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
console.log(process.env.MONGODB_URI)
//yhteys kannan väliin muodestettään täällä
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connection established', process.env.MONGODB_URI)
    })
    .catch(error => {
        console.log(error)
    })

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use(middleware.logger)
app.use('/api/blogs', blogRouter)



const PORT = process.env.PORT ||  3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

})