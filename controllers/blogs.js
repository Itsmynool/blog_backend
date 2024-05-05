const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
    Blog.find({})
        .then(blog => {
            response.json(blog)
        })
        .catch(next)
})

blogsRouter.post('/', (request, response, next) => {
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

    newBlog.save()
        .then(savedBlog => {
            response.json(savedBlog)
        })
        .catch(next)
})

module.exports = blogsRouter