const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);

module.exports = GalleryItem;