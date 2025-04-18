const express = require('express');
const router = express.Router();
const galleryItemController = require('../controllers/galleryItemController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './backend/public/uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Add a new gallery item
router.post('/', upload.single('image'), galleryItemController.addGalleryItem);
router.get('/', galleryItemController.getAllGalleryItems);
router.delete('/:id', galleryItemController.deleteGalleryItem);

module.exports = router;