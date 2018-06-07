//testi funktio
const dummy = (blogs) => {
    return  1
}

//tykkäyksiä
const totalLikes = (blogs) => {
    return blogs[0].likes
}

const format = (obj) => {
    return {
        title : obj[0].title,
        author: obj[0].author,
        likes: obj[0].likes
    }
}
//suosikkeja
const favoriteBlog = (blogs) => {
    let highest = 0
    blogs.map(m => m.likes > highest ? highest = m.likes : m.likes)

    const test = blogs.filter(f => f.likes === highest)
    const copyofTest = format(test)
    console.log('test ', copyofTest)
    return copyofTest
}
module.exports = {dummy, totalLikes, favoriteBlog}