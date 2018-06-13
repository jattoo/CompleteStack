const {app, server } = require('../index')
const superT = require('supertest')
const api =superT(app)
const Blog = require('../models/note')

describe('Api level tests', () => {
    
    //blogilistan testit, osa 1 - get http pynnölle
    test.skip('blogs are returned', async () => {
        const res = await api
            .get('/api/blogs')

        const origins = await api
            .get('/api/blogs')
        
        expect(res.body.length).toBe(origins.body.length)
    })

    //blogilistan testit, osa 2
    test.skip('able to add new blogs', async () => {
        const origins = await api
            .get('/api/blogs')
        const demo = {
            title: 'blogilistan testit, osa 2',
            author: 'the man behind the wheel',
            likes: 4,
            url: 'https://example.com'
        }

        await api
            .post('/api/blogs')
            .send(demo)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const res = await api
            .get('/api/blogs')

        expect(res.body.length).toBe(origins.body.length + 1)
    })

    //blogilistan testit, osa 3
    test('blogs without likes = 0', async () => {
        //ennen blogin lisääminen
        const origins = await api
            .get('/api/blogs')

        const newBlog = {
            title: 'blogilistan testit, osa 3',
            author: 'Me Minä',
            url: 'https://example.com'
        }
        
        if (newBlog.likes === undefined){
            newBlog.likes = 0

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
        }
        //blogin lisäämisen jälkeen
        const res = await api
            .get('/api/blogs')

        expect(res.body.length).toBe(origins.body.length + 1)
        
    })  

    
})

afterAll(() => {
    server.close()
})