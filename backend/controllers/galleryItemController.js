const GalleryItem = require('../models/GalleryItem');

// Add a new gallery item
const addGalleryItem = async (req, res) => {
    try {
        const { description, imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const newGalleryItem = new GalleryItem({ imageUrl, description });
        const savedGalleryItem = await newGalleryItem.save();
        res.status(201).json(savedGalleryItem);
    } catch (error) {
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