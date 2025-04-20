const { uploadImage } = require('../utils/fileHelper');

const uploadImageController = (req, res) => {
  uploadImage(req, res, (err, imageUrl) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed'
      });
    }

    if (!imageUrl) {
      return res.status(500).json({
        success: false,
        message: 'Failed to process uploaded file'
      });
    }

    res.json({
      success: true,
      imageUrl
    });
  });
};

module.exports = { uploadImageController };