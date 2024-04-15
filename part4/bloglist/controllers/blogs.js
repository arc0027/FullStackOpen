const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const userExtractor = require('../utils/middleware').userExtractor;

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

router.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body);
  const user = request.user;

  if (!user) {
    return response.status(403).json({ error: 'user missing' });
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title or url missing' });
  }

  blog.likes = blog.likes || 0;
  blog.user = user;
  user.blogs.push(blog._id);

  await Promise.all([user.save(), blog.save()]);

  response.status(201).json(blog);
});

router.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(204).end();
  }

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: 'user not authorized' });
  }

  await Promise.all([blog.deleteOne(), user.save()]);

  response.status(204).end();
});

router.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true }
  );

  response.json(updatedBlog);
});

module.exports = router;
