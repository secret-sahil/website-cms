import express from 'express';
import { validate } from '../modules/validation/validate.middleware';
import { auth } from '../modules/auth';
import { applicationController, applicationSchema } from '../modules/applications';

const router = express.Router();

router.get(
  '/',
  auth.deserializeUserIfAvaliable,
  auth.requireUserIfAvaliable(['admin', 'hr']),
  validate(applicationSchema.getApplicationSchema),
  applicationController.getApplicationHandler,
);

router.get(
  '/:id',
  auth.deserializeUserIfAvaliable,
  auth.requireUserIfAvaliable(['admin', 'hr']),
  validate(applicationSchema.getApplicationByIdSchema),
  applicationController.getApplicationById,
);

router.delete(
  '/delete/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'hr']),
  validate(applicationSchema.deleteApplicationSchema),
  applicationController.deleteApplicationHandler,
);

router.patch(
  '/update/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'hr']),
  validate(applicationSchema.updateApplicationSchema),
  applicationController.updateApplicationHandler,
);

export default router;
