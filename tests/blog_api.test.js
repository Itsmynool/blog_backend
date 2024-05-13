const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    //console.log("blogObjects: ", blogObjects);
    //console.log("promiseArray: ", promiseArray);
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const author = response.body.map(e => e.author)
    assert.strictEqual(author.includes('Juan Perez'), true)
  })

  describe('viewing a specific note', () => {
    test('success with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNoneExistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNoneExistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new blog', () => {
    test('a valid blog can be added', async() => {
      const newBlog = {
        title: 'Visitando España',
        author: 'Luis Villa',
        url: 'https://luisvilla.com/visitando_espa?a',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      assert(titles.includes('Visitando España'))
    })

    test('blog without title is not added', async() => {
      const newBlog = {
        author: 'Santiago Abadia',
        url: 'https://santiago.com/miblogsito',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('a blog can be deleted', async () => {
      console.log('entered test')
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
      
      const blogsAtEnd = await helper.blogsInDb()
      
      const titles = blogsAtEnd.map(blog => blog.title)

      assert(!titles.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  describe('modification of a blog', () => {
    test('a valid blog can be modify', async () => {
      const blogAtStart = await helper.blogsInDb()
      const blogToModify = blogAtStart[0]
      const newData = {
        likes: blogToModify.likes + 1
      }

      const blogModify = await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(newData)
        .expect(200)

        assert.strictEqual(blogModify.body.likes, blogToModify.likes + 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})