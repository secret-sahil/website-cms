import express from 'express';
import { validate } from '../modules/validation/validate.middleware';
import { auth, authController, authSchema } from '../modules/auth';
import { imageUpload } from '../modules/upload/fileUpload.middleware';

const router = express.Router();

router.post(
  '/register',
  auth.deserializeUser,
  auth.requireUser(['admin']),
  imageUpload.single('photo'),
  validate(authSchema.registerUserSchema),
  authController.registerUserHandler,
);

router.post(
  '/change-password',
  auth.deserializeUser,
  validate(authSchema.changePasswordSchema),
  authController.changePasswordHandler,
);

router.post(
  '/login',
  validate(authSchema.loginWithPasswordSchema),
  authController.loginWithPasswordHandler,
);

router.post('/refresh', authController.refreshAccessTokenHandler);

router.post('/logout', authController.logoutUserHandler);

export default router;
