const mongoose = require('mongoose')

//mongoose schema
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: { type : mongoose.Schema.Types.ObjectId, ref: 'User'}
})

//mongoose static method
blogSchema.statics.format= (blog) => {
    return {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user
    }
}

//mongoose model
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog