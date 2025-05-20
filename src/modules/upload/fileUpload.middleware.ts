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
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only .jpg, .png, or .jpeg format allowed!'));
    }
  },
});

export const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1000000, //5 mb
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only .pdf format allowed!'));
    }
  },
});
