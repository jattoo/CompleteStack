const mongoose = require('mongoose')

//created our mongoose schema
const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
    adult: Boolean,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
})


//generated a static method from our mongoose schema
userSchema.statics.format = (user) => {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        adult: user.adult
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User