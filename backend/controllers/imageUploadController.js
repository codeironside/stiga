const { uploadImage } = require('../utils/fileHelper');

const uploadImageController = (req, res) => {
  uploadImage(req, res, (err, imageUrl) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ message: err.message });
    }

    if (!imageUrl) {
      return res.status(400).json({ message: 'No image uploaded' });
    }
    res.status(200).json({ imageUrl });
  });
};

module.exports = { uploadImageController };