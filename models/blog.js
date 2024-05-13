const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.set('strictQuery', false)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    likes: {
        type: Number
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema, 'blogs')