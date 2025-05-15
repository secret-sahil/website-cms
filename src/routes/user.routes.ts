import express from 'express';
import { auth } from '../modules/auth';
import { userController, userSchema } from '../modules/user';
import { validate } from '../modules/validation/validate.middleware';
import { imageUpload } from '../modules/upload/fileUpload.middleware';

const router = express.Router();

router.get('/me', auth.deserializeUser, userController.getMeHandler);

router.patch(
  '/update-user',
  auth.deserializeUser,
  auth.requireUser(['admin']),
  imageUpload.single('photo'),
  validate(userSchema.updateUserSchema),
  userController.updateUser,
);

// admin routes
router.get(
  '/',
  auth.deserializeUser,
  auth.requireUser(['admin']),
  userController.getAllUsersAdminHandler,
);

export default router;
