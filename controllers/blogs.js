const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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
    const {title, author, url} = request.body

    if ((!title) || (!author) || (!url)) {
        return response.status(400).json({ error: 'content missing' })
    }

    const newBlog = new Blog ({
        title: title,
        author: author,
        url: url,
        likes: 0
    })

    const blogAdded = await newBlog.save()
    response.status(201).json(blogAdded)
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const dataToUpdate = request.body

    const blogUpdated = await Blog.findByIdAndUpdate(id, dataToUpdate, { new: true, runValidators: true, context: 'query' })
    response.json(blogUpdated)
})

module.exports = blogsRouter