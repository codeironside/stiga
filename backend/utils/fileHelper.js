const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = 'public/uploads';
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

// Create upload directory if not exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const sanitizeFilename = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  const base = path.basename(filename, ext).replace(/[^a-z0-9]/gi, '_');
  return `${Date.now()}_${base}${ext}`;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, sanitizeFilename(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const isValidMimeType = file.mimetype.startsWith('image/');
  const isValidExtension = ALLOWED_EXTENSIONS.has(ext);

  if (isValidMimeType && isValidExtension) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types: ${Array.from(ALLOWED_EXTENSIONS).join(', ')}`));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE_MB * 1024 * 1024,
    files: 1
  }
});

const uploadImage = (req, res, callback) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return callback(err);
    }

    if (!req.file) {
      return callback(new Error('No file uploaded'));
    }

    // Additional security check
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      fs.unlinkSync(req.file.path);
      return callback(new Error('Invalid file extension'));
    }

    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    callback(null, imageUrl);
  });
};

module.exports = { uploadImage };