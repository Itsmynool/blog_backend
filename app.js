const express = require('express')
require('express-async-errors')
const cors = require('cors')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require ('./controllers/login')

const app = express()

app.use(express.json())
app.use(cors())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
