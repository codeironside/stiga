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

const upload = multer({ storage: storage });

// Add a new gallery item
const addGalleryItem = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) return res.status(400).json({ message: err.message });
      if (!req.file) return res.status(400).json({ message: 'No image uploaded' });
      const { description } = req.body;
      const imageUrl = `/uploads/${req.file.filename}`;
      const newGalleryItem = new GalleryItem({ imageUrl, description });
      const savedGalleryItem = await newGalleryItem.save();
      res.status(201).json(savedGalleryItem);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all gallery items
const getAllGalleryItems = async (req, res) => {
  try {
    const galleryItems = await GalleryItem.find();
    res.status(200).json(galleryItems);
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