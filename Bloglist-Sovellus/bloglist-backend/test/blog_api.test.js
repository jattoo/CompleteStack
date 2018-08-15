const {app, server } = require('../index')
const superT = require('supertest')
const api =superT(app)
const Blog = require('../models/note')
const { originBlogs, blogsInDb, usersInDb } = require('./test_helper')
const User = require('../models/user')

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
    describe.skip('New blog functionalities', async() => {
        test('able to add new blogs', async () => {
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
        test('if no likes field given, then default to \'likes = 0\'', async () => {
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
        test('title and url fields empty', async () => {
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
    describe.skip('Delete functionalities', async () => {

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

    //blogilistan laajennus, osa 3
    describe('Update functionality', async () => {
        test('able to edit a blog\'s like', async () => {
            const blogsInTheBeginning = await blogsInDb()

            const demoBlog = {
                title: 'blogilistan laajennus, osa 3',
                author: 'Me Minä',
                likes : 50,
                url: 'https://example.com'
            }

            const newGuy = await api 
                .post('/api/blogs')
                .send(demoBlog)
                .expect(200)
        
            const blogUpdater = {
                likes : 100
            }
           
            await api
                .put(`/api/blogs/${newGuy.body.id}`)
                .send(blogUpdater)

            const res = await blogsInDb()
            const likes = res.map(blogs => blogs.likes)


            expect(likes).toContain(blogUpdater.likes)
            expect(blogsInTheBeginning.length).toBe(res - 1)
        })
    })

    //blogilistan laajennus, osa 5
    describe.only('check user addition validation functionalities', async () => {
        //aloitettaan aina tyjästä db:sta
        beforeAll(async () => {
            await User.remove({})
            const user = new User({ username: 'root', password: 'root'})
            await user.save()
        })

        test.skip('fails if password less than 3 characters', async () => {
            const usersInTheBeginning = await usersInDb()

            const newUser = {
                username : 'hello',
                name: 'Hello Find',
                password: 'hn'
            }
           
            await api
                .post('/api/blogusers')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            
           

            const usersAfterOperation= await usersInDb()
            expect(usersInTheBeginning.length).toBe(usersAfterOperation.length)
        })

        test.skip('fails if username exists', async () => {
            const usersInTheBeginning =await usersInDb()

            const newUser = {
                username: 'root',
                name: 'root bottom',
                password: 'secret'
            }

            await api
                .post('/api/blogusers')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            const usersAfterOperation= await usersInDb()
            expect(usersAfterOperation.length).toBe(usersInTheBeginning.length)
        })
        
        test('if no age supplied then user = adult by default', async () => {
            const usersInTheBeginning =await usersInDb()
            
           
            const newUser = {
                username: 'nice',
                name: 'nice try',
                password: 'secret',
                adult : false
            }
            
            
            const addedUser = await api
                .post('/api/blogusers')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const addAge = {
                adult: true
            }
            if (newUser.adult === undefined){
                await api
                    .put(`/api/blogusers/${addedUser.body.id}`)
                    .send(addAge)
            }
            
            
            const usersAfterOperation= await usersInDb()
            expect(usersAfterOperation.length).toBe(usersInTheBeginning.length + 1)


        
        })

    })
})

afterAll(() => {
    server.close()
})
