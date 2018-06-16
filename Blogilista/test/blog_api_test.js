const {app, server } = require('../index')
const superT = require('supertest')
const api =superT(app)
const Blog = require('../models/note')
const { originBlogs, blogsInDb } = require('./test_helper')

describe('Api level tests with helper fn', () => {

    //alkutoimet
    beforeAll(async () => {
        await Blog.remove({})

        const blogsPaks = originBlogs.map(b => new Blog(b))
        await Promise.all(blogsPaks.map(bp => bp.save()))
    })

    //blogilistan testit, osa 1 - get http pynnölle - refaktoroitu(blogilistan laajennus, osa 1)
    describe.skip('fetch functionality present', async() => {
        test('All blogs are returned', async () => {
            const blogsInTheBeginning = await blogsInDb()

            const res = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        
            expect(res.body.length).toBe(blogsInTheBeginning.length)
        })
    })

    //blogilistan testit, osa 2 - refaktoroitu(blogilistan laajennus, osa 1)
    describe('New blog functionalities', async() => {
        test.skip('able to add new blogs', async () => {
            const blogsInTheBeginning = await blogsInDb()
            
            const demo = {
                title: 'blogilistan laajennus, osa 1',
                author: 'Moe Kuningas',
                likes: 4,
                url: 'https://example.com'
            }

            await api
                .post('/api/blogs')
                .send(demo)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const res = await blogsInDb()
            const contents = res.map(r => r.title)
            expect(res.length).toBe(blogsInTheBeginning.length + 1)
        })

        //blogilistan testit, osa 3 - refaktoroitu(blogilistan laajennus, osa 1)
        test.skip('if no likes field given, then default to \'likes = 0\'', async () => {
        //tilaa ennen blogin lisääminen
            const blogsInTheBeginning = await blogsInDb()

            const newBlog = {
                title: ' blogilistan laajennus, osa 1',
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
        
            //tilaa blogin lisäämisen jälkeen
            const res = await blogsInDb()

            expect(res.length).toBe(blogsInTheBeginning.length + 1)
        
        })
   


        // blogilistan testit, osa 4 - refaktoroitu(blogilistan laajennus, osa 1)
        test.skip('title and url fields empty', async () => {
            const newBlog = {
                author: 'Me Minä',
                likes: 4
            }
            //alkutila
            const blogsInTheBeginning = await blogsInDb()
          
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
        
            //processien jäkeinen tila
            const res = await blogsInDb()
            
        
        
            expect(res.length).toBe(blogsInTheBeginning.length)
        })
    })
    
    //blogilistan laajennus, osa 2
    describe('Delete functionalities', async () => {

        test('delete a particular blog', async () => {
            const demo = {
                title: 'blogilistan laajennus, osa 2',
                author: 'Moe Kuningas',
                likes: 4,
                url: 'https://example.com'
            }
            
            const addedBlog = await api
                .post('/api/blogs')
                .send(demo)
                .expect(200)


            const blogsInTheBeginning = await blogsInDb()

            await api 
                .delete(`/api/blogs/${addedBlog.body.id}`)

            const res = await blogsInDb()

            const contents = res.map(c => c.title)

            //varmistetaan loppu tuloksen kahdella eri keinoilla tassa tapauksessa
            expect(contents).not.toContain('blogilistan laajennus, osa 2')
            expect(res.length).toBe(blogsInTheBeginning.length - 1)

        })
    })
    
})

afterAll(() => {
    server.close()
})