const express = require('express');
const router = express.Router();
const blogPostController = require('../controllers/blogPostController');

// Create a new blog post
router.post('/', blogPostController.createBlogPost);

// Get all blog posts
router.get('/', blogPostController.getAllBlogPosts);

// Get a blog post by ID
router.get('/:id', blogPostController.getBlogPostById);

// Update a blog post
router.put('/:id', blogPostController.updateBlogPost);

// Delete a blog post
router.delete('/:id', blogPostController.deleteBlogPost);

module.exports = router;