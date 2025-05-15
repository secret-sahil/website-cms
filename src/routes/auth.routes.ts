import express from 'express';
import { validate } from '../modules/validation/validate.middleware';
import { authController, authSchema } from '../modules/auth';
import { deserializeUser } from '../modules/auth/auth.middleware';

const router = express.Router();

router.post(
  '/register',
  validate(authSchema.registerUserSchema),
  authController.registerUserHandler,
);

router.post(
  '/change-password',
  deserializeUser,
  // auth.requireUser(['user', 'admin', 'company']),
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
