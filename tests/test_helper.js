const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    { 
        title: 'Mi primer blog',
        author: 'Juan Perez',
        url: 'https://example.com/blog1',
        likes: 20
    },
    { 
        title: 'Blog de viajes',
        author: 'Ana López',
        url: 'https://example.com/blog2',
        likes: 15 }
];

const nonExistingId = async () => {
    const blog = new Blog({ title: 'Mi segundo blog', author: 'Juan Perez', url: 'https://example.com/blog2', likes: 0 })
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}