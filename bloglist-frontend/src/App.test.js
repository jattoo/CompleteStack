import React from 'react'
import { mount } from 'enzyme'
import App from './App'
jest.mock('./services/blogs')

describe('Testing <App />', () => {
    let app
    beforeAll(() => {
        app = mount(<App />)


    })
   
    it('renders all the notes', () => {
        app.update()
        
        const loginComponent = app.find('.login')
        expect(loginComponent.exists()).toBe(true)
        
        let blogComponent = app.state().blogs
        app.state().username = 'username'
        app.state().password = '123456'

        const username = app.state().username
        const password = app.state().password

        const userTryingToLogIn = {
            username: username,
            password : password
        }
        
        const user = {
            username: 'username',
            password: '123456'
        }
        let canLogg = false
        if (userTryingToLogIn.username === user.username && userTryingToLogIn.password === user.password){
            canLogg = true
        }
        console.log('username1: ',canLogg)
        
        
        const signIn = loginComponent.find('button')
        signIn.simulate('submit')
        if(canLogg){
            expect(blogComponent.length).toBe(4)
            
        } else {
            blogComponent=[]
            expect(blogComponent.length).toBe(0)

            app.unmount()
        }

    })
})
