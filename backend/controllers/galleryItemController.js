const GalleryItem = require('../models/GalleryItem');



const addGalleryItem = async (req, res) => {
  try {
    const { imageUrl, description } = req.body;

    // Validate input
    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image URL is required'
      });
    }

    // Check for existing image URL
    const existingItem = await GalleryItem.findOne({ imageUrl });

    if (existingItem) {
      return res.status(409).json({
        success: false,
        message: 'This image already exists in the gallery'
      });
    }

    // Create new gallery item
    const newItem = await GalleryItem.create({
      imageUrl: imageUrl.trim(),
      description: description?.trim() || ''
    });

    res.status(201).json({
      success: true,
      data: {
        id: newItem._id,
        imageUrl: newItem.imageUrl,
        uploadedAt: newItem.createdAt
      }
    });

  } catch (error) {
    // Handle duplicate key error at database level
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This image already exists in the gallery'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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