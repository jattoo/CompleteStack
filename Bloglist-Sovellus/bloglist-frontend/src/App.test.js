import React from 'react'
import { mount } from 'enzyme'
import App from './App'
jest.mock('./services/blogs')

describe('Testing <App />', () => {
    let app
    beforeAll(() => {
        app = mount(<App />)
    })
   
    it.skip('when not logged in', () => {
        app.update()
        
        const loginComponent = app.find('.login')
        expect(loginComponent.exists()).toBe(true)
    })
    
    describe.only('when user is logged', () => {
        let app
        beforeEach(() => {
            app = mount(<App />)
        })
        
        it('when user is logged', () => {
            const user = {
                username: 'tester',
                token: '1231231214',
                name: 'Teuvo Testaaja'
            }
            
            localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            app.state().user= user
            const loginComponent = app.find('.login')
            const blogComponent = app.find('.blogtosee')
            const button = loginComponent.find('button')
            app.state().password='1234567'

            if (app.state().username === user.name && app.state().password === '1234567'){
                button.simulate('click')
                expect(blogComponent.exists()).toBe(true)
            } else {
                expect(blogComponent.exists()).toBe(false)
            }
        })
    })

})

