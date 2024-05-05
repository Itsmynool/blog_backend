const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const config = require('./utils/config')
const {info} = require('./utils/logger')
const {requestLogger, unknownEndpoint, errorHandler} = require('./controllers/middleware')
const blogsRouter = require('./controllers/blogs')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(config.PORT, () => {
    info(`Server running on port ${config.PORT}`)
})