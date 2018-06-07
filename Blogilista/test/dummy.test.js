//require our test methods
const listHelper = require('../utils/list_helper').dummy

//Tuloksen muokaillu
describe ('dummy', () => {
    //ensimmäinen test
    test('dummy is called', () => {
        const blogs = []
        const result = listHelper(blogs) 
        
        //odotettava tulos
        expect(result).toBe(1)
    })
})