const express = require('express');
const router = express.Router();
const { uploadImageController } = require('../controllers/imageUploadController');

router.post('/api/upload', uploadImageController);

module.exports = router;