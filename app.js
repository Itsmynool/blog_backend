const express = require('express')
require('express-async-errors')
const cors = require('cors')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const app = express()

app.use(express.json())
app.use(cors())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
