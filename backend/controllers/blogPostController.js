const BlogPost = require('../models/BlogPost');

// Create a new blog post
const createBlogPost = async (req, res) => {
  try {
    const newBlogPost = new BlogPost(req.body);
    const savedBlogPost = await newBlogPost.save();
    res.status(201).json(savedBlogPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all blog posts
const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.status(200).json(blogPosts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a specific blog post by ID
const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json('Blog post not found');
    }
    res.status(200).json(blogPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a blog post
const updateBlogPost = async (req, res) => {
  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedBlogPost) {
      return res.status(404).json('Blog post not found');
    }
    res.status(200).json(updatedBlogPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a blog post
const deleteBlogPost = async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedBlogPost) {
      return res.status(404).json('Blog post not found');
    }
    res.status(200).json('Blog post has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};