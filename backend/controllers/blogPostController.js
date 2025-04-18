const BlogPost = require('../models/BlogPost');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });



// Create a new blog post
const createBlogPost = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({ message: err.message });
      }

      const { title, content, author } = req.body;
      let imageUrl = "";

      if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
      }

      const newBlogPost = new BlogPost({
        title,
        content,
        author,
        imageUrl,
      });
      const savedBlogPost = await newBlogPost.save();
      res.status(201).json(savedBlogPost);
    });
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

// Get a specific blog post by ID
const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json('Blog post not found');
    }
    res.status(200).json(blogPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a blog post
const updateBlogPost = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({ message: err.message });
      }

      const { title, content, author } = req.body;
      let imageUrl;

      if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
      } else {
        const existingPost = await BlogPost.findById(req.params.id);
        imageUrl = existingPost.imageUrl;
      }

      const updatedBlogPost = await BlogPost.findByIdAndUpdate(
        req.params.id,
        {
          title,
          content,
          author,
          imageUrl,
        },
        { new: true, runValidators: true }
      );
      if (!updatedBlogPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.status(200).json(updatedBlogPost);
    });
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