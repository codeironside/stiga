const BlogPost = require('../models/BlogPost');

const createBlogPost = async (req, res) => {
  try {
    const { title, content, author, imageUrl } = req.body;

    const newBlogPost = new BlogPost({
      title,
      content,
      author,
      imageUrl: imageUrl || "",
    });

    try {
      const savedBlogPost = await newBlogPost.save();
      res.status(201).json(savedBlogPost);
    } catch (saveError) {
      console.error("Error saving blog post:", saveError);
      res.status(500).json({ message: saveError.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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