import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from  './SimpleBlog'

describe.skip('<SimpleBlog /> komponentin testaus', () => {
    it.skip('renders blog title', () => {
        const blog={
            title: 'Its never late to learn making porridge',
            author: 'Sir Moe Kuningas',
            likes: 100
        }

        const titleComponent = shallow(<SimpleBlog blog={blog}/>)
        const titleDiv = titleComponent.find('.titleAndAuthor')
        

        expect(titleDiv.text()).toContain(blog.title)
        expect(titleDiv.text()).toContain(blog.author)
    })

    it.skip('renders blog likes', () => {
        const blog={
            title: 'Its never late to learn making porridge',
            author: 'Sir Moe Kuningas',
            likes: 100
        }
        const likeComponent = shallow(<SimpleBlog blog={blog} />)
        const likesDiv = likeComponent.find('.likees')

        expect(likesDiv.text()).toContain(blog.likes)
    })

    it('multiple button click creates a double event', () => {
        const blog={
            title: 'Its never late to learn making porridge',
            author: 'Sir Moe Kuningas',
            likes: 100
        }
        const mockHandler = jest.fn()

        const component = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)

        const button = component.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
  
})
