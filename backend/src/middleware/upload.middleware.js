const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AppError = require('../utils/appError');

// Ensure upload directories exist
const createUploadDirs = () => {
  const dirs = ['uploads', 'uploads/images', 'uploads/audio', 'uploads/video'];
  dirs.forEach(dir => {
    if (!fs.existsSync(path.join(__dirname, '../../', dir))) {
      fs.mkdirSync(path.join(__dirname, '../../', dir), { recursive: true });
    }
  });
};

createUploadDirs();

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = path.join(__dirname, '../../uploads');
    
    // Determine the appropriate subfolder based on file type
    if (file.mimetype.startsWith('image/')) {
      uploadPath = path.join(uploadPath, 'images');
    } else if (file.mimetype.startsWith('audio/')) {
      uploadPath = path.join(uploadPath, 'audio');
    } else if (file.mimetype.startsWith('video/')) {
      uploadPath = path.join(uploadPath, 'video');
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Create a unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accept images, audio, and video files
  if (
    file.mimetype.startsWith('image/') || 
    file.mimetype.startsWith('audio/') || 
    file.mimetype.startsWith('video/')
  ) {
    cb(null, true);
  } else {
    cb(new AppError('Only image, audio, and video files are allowed!', 400), false);
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB max file size
  }
});

// Middleware for handling file upload errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(new AppError('File too large. Maximum size is 50MB.', 400));
    }
    return next(new AppError(`File upload error: ${err.message}`, 400));
  }
  next(err);
};

// Export middleware functions
module.exports = {
  uploadSingle: (fieldName) => upload.single(fieldName),
  uploadMultiple: (fieldName, maxCount) => upload.array(fieldName, maxCount),
  uploadFields: (fields) => upload.fields(fields),
  handleMulterError
};
