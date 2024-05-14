const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)
    if(blog){
        response.json(blog)
    } else{
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
})

blogsRouter.post('/', async (request, response) => {
    const {title, author, url, userId} = request.body

    const user = await User.findById(userId)

    const blog = new Blog ({
        title: title,
        author: author,
        url: url,
        likes: 0,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const dataToUpdate = request.body

    const blogUpdated = await Blog.findByIdAndUpdate(id, dataToUpdate, { new: true, runValidators: true, context: 'query' })
    response.json(blogUpdated)
})

module.exports = blogsRouter