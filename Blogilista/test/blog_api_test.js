const {app, server } = require('../index')
const superT = require('supertest')
const api =superT(app)
const Blog = require('../models/note')

describe('Api level tests', () => {
    
    //blogilistan testit, osa 1 - get http pynnölle
    test('blogs are returned', async () => {
        const res = await api
            .get('/api/blogs')

        const origins = await api
            .get('/api/blogs')
        
        expect(res.body.length).toBe(origins.body.length)
    })
})

afterAll(() => {
    server.close()
})