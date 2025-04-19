const GalleryItem = require('../models/GalleryItem');
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

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Add a new gallery item
const addGalleryItem = async (req, res) => {
  try {
    console.log("Request body:", req.file);
    upload.single('image')(req, res, async (err) => {
      
      if (err) {
        console.log(`error uploading ${res.toJson()}`);
        return res.status(400).json({ message: err.message })
      };
      if (!req.file) return res.status(400).json({ message: 'No image uploaded' });
      const { description } = req.body;
      const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
      const newGalleryItem = new GalleryItem({ imageUrl, description });
      const savedGalleryItem = await newGalleryItem.save();
      res.status(201).json(savedGalleryItem);
    });
  } catch (error) {
    console.log("Error in addGalleryItem:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all gallery items
const getAllGalleryItems = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        const galleryItems = await GalleryItem.find()
          .skip(skip)
          .limit(limit);
    
        const totalItems = await GalleryItem.countDocuments();
    
        res.status(200).json({ galleryItems, totalItems });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

// Delete a gallery item
const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGalleryItem = await GalleryItem.findByIdAndDelete(id);
    if (!deletedGalleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.status(200).json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addGalleryItem,
  getAllGalleryItems,
  deleteGalleryItem,
};