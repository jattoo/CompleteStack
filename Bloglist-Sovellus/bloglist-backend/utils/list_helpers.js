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
    console.log('favorite blog: ', copyofTest)
    return copyofTest
}
const looks = (hw, h) => {
    return {
        author: hw,
        blogs : h
    }
}

//mostblog writer
const mostBlog = (blogs) => {
    let highest = 0
    let hwriter = ''
    
    const test = blogs.map(m => 
    { if(m.author === m.author){
        hwriter = m.author
    }
    }
    )
    const findAmount = blogs.filter(f => {
        if(f.author === hwriter){
            highest += 1
        }
    })
    const copy = looks(hwriter, highest)
    console.log('Enemmän blogeja: ', copy)
    return copy
}
const shape = (hw, h) => {
    return {
        author: hw,
        likes : h
    }
}

//mostLikes kirjoittaja
const mostLikes = (blogs) => {
    let highest = 0
    let tLikes = 0
    
    //etsitään kenellä on suurin like
    blogs.map(m => m.likes > highest ? highest = m.likes : m.likes)

    //etsitään edellisen perusteella isonin tykkäyksen saajan nimen
    const writer = blogs.filter(f => f.likes === highest)
    
    //nimen perusteella nyt tehdään like:n yhteenlasku
    blogs.map(sm => {
        if(sm.author === writer[0].author){
            tLikes += sm.likes
        }
    })
    
    const copy = shape(writer[0].author, tLikes)
    console.log('mostlike: ', copy)
    return copy
}

module.exports = {
    dummy, 
    totalLikes, 
    favoriteBlog,
    mostBlog,
    mostLikes
}
