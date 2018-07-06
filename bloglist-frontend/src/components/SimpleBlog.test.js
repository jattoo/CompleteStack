import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from  './SimpleBlog'

describe('<SimpleBlog /> komponentin testaus', () => {
    it('renders blog title', () => {
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

    it('renders blog likes', () => {
        const blog={
            title: 'Its never late to learn making porridge',
            author: 'Sir Moe Kuningas',
            likes: 100
        }
        const likeComponent = shallow(<SimpleBlog blog={blog} />)
        const likesDiv = likeComponent.find('.likees')

        expect(likesDiv.text()).toContain(blog.likes)
    })
})