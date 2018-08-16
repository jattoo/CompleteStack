let token


const blogs = [
    {
        id: "5b2bca353cb4111eb8317039",
        title: "Simpsonin perheen kuopus",
        author: "Maggie Simpson",
        url: "http://www.simpsonit.org/hahmot/marge-simpson/",
        likes: 76,
        user: {
            _id: "5b2bc99b3cb4111eb8317038",
            username: "b4bart",
            name: "Bart Simpson"
        }
    },
    {
        id: "5b2f823a52ba572908b745c7",
        title: "Simpsonien perheen pää Homer on aviomiehenä ja isänä kaukana täydellisyydestä",
        author: "Homer J. Simpson",
        url: "http://www.simpsonit.org/hahmot/marge-simpson/",
        likes: 78,
        user: {
            _id: "5b2f81ad52ba572908b745c6",
            username: "lambda",
            name: "Joe Lambda"
        }
    },
    {
        id: "5b2f82ed52ba572908b745c8",
        title: "Bolt's personal fb page",
        author: "Usein Bolt",
        url: "https://fi-fi.facebook.com/usainbolt/",
        likes: 196,
        user: {
            _id: "5b2f81ad52ba572908b745c6",
            username: "lambda",
            name: "Joe Lambda"
        }
    },
    {
        id: "5b2f83cd52ba572908b745c9",
        title: "App developers get their wish with expanded support for free trials",
        author: "Sarah Perez",
        url: "https://tcrn.ch/2LlULGR",
        likes: 128,
        user: {
            _id: "5b2f81ad52ba572908b745c6",
            username: "lambda",
            name: "Joe Lambda"
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}
export default { getAll, blogs }
