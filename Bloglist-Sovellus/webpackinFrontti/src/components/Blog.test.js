import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'


describe.skip('<Blog test />', () => {
    let component, blog
    beforeEach(() => {
        blog = {
            title: 'Having some blog test',
            author: 'Kuningas Moe',
            url: 'http://mitakuuluu.com',
            likes: 100,
            
        }
        const mockHandler = jest.fn()
        component = shallow(
            <Blog 
                title={blog.title}
                author={blog.author}
                url={blog.url}
                likes={blog.likes}
                addLikes={() => mockHandler}
                cancelLikes={() => mockHandler}
                poisto={mockHandler}
    
            />)
    })
    
    it('after clicking name the details are displayed', () =>{
        const defaultContentDiv = component.find('.hideContent')
        defaultContentDiv.simulate('click')

        //alkutilan tarkistus
        expect(defaultContentDiv.text()).toContain(blog.title)
        expect(defaultContentDiv.text()).toContain(blog.author)
        expect(defaultContentDiv.text()).not.toContain(blog.url)
        expect(defaultContentDiv.text()).not.toContain(blog.likes)

        const contentDiv = component.find('.showContent')
        
        //tapahtuman käsittelijän klikkaamisen jälkeen
        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).not.toContain(blog.url)
        expect(contentDiv.text()).not.toContain(blog.likes)
    })
})
