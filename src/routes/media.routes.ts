import express from 'express';
import { validate, validateFilePresence } from '../modules/validation/validate.middleware';
import { auth } from '../modules/auth';
import { mediaController, mediaSchema } from '../modules/media';
import { fileUpload } from '../modules/upload/fileUpload.middleware';

const router = express.Router();

router.use(auth.deserializeUser, auth.requireUser(['admin', 'content']));

router.get('/', validate(mediaSchema.getMediaSchema), mediaController.getMediaHandler);

router.post(
  '/upload',
  fileUpload.single('file'),
  validateFilePresence(1, 1),
  mediaController.createMediaHandler,
);

router.delete(
  '/delete/:id',
  validate(mediaSchema.deleteMediaSchema),
  mediaController.deleteMediaHandler,
);

router.patch(
  '/update/:id',
  fileUpload.single('file'),
  validateFilePresence(1, 1),
  validate(mediaSchema.updateMediaSchema),
  mediaController.updateMediaHandler,
);

export default router;
