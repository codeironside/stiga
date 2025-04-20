const express = require('express');
const router = express.Router();
const { uploadImageController } = require('../controllers/imageUploadController');

router.post('/api/uploads', uploadImageController);

module.exports = router;