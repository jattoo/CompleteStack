const mongoose = require('mongoose')

//created our mongoose schema
const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
    adult: Boolean,
    blog: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
})


//generated a static method from our mongoose schema
userSchema.statics.format = (user) => {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        adult: user.adult,
        blogs: user.blog
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User
