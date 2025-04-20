const BlogPost = require('../models/BlogPost');


const { isValidObjectId } = require('mongoose');

const createBlogPost = async (req, res) => {
  try {
    const { title, content, author, imageUrl } = req.body;
 
    // Validate input
    if (!title || !content || !author || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: `All fields are required ${JSON.stringify(req.body)}`
      });
    }

    // Check for existing title (case-insensitive)
    const existingPost = await BlogPost.findOne({
      title: { $regex: new RegExp(`^${title}$`, 'i') }
    });

    if (existingPost) {
      return res.status(409).json({
        success: false,
        message: 'Blog post with this title already exists'
      });
    }

    // Create new post with atomic check
    const newPost = await BlogPost.create({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      imageUrl: imageUrl.trim()
    });

    res.status(201).json({
      success: true,
      data: {
        id: newPost._id,
        title: newPost.title,
        author: newPost.author,
        createdAt: newPost.createdAt
      }
    });

  } catch (error) {
    // Handle duplicate key error at database level
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Blog post with this title already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getAllBlogPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalItems = await BlogPost.countDocuments();
    const blogPosts = await BlogPost.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      items: blogPosts,
      totalItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateBlogPost = async (req, res) => {
  try {
    const { title, content, author, imageUrl } = req.body;

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content, author, imageUrl: imageUrl || "" },
      { new: true, runValidators: true }
    );

    if (!updatedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json(updatedBlogPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ message: error.message });
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