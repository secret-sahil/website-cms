import multer from 'multer';

export const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1000000,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/webp' ||
      file.mimetype === 'image/gif'
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only .jpg, .png, or .jpeg format allowed!'));
    }
  },
});
