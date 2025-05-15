import express from 'express';
import { auth } from '../modules/auth';
import { imageUpload } from '../modules/upload/fileUpload.middleware';
import { uploadSingleFileHandler } from '../modules/upload/upload.controller';
const router = express.Router();

router.post('/image', auth.deserializeUser, imageUpload.single('file'), uploadSingleFileHandler);

export default router;
