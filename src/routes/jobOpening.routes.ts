import express from 'express';
import { validate, validateFilePresence } from '../modules/validation/validate.middleware';
import { auth } from '../modules/auth';
import { jobOpeningController, jobOpeningSchema } from '../modules/jobOpening';
import { resumeUpload } from '../modules/upload/fileUpload.middleware';

const router = express.Router();

router.get(
  '/',
  auth.deserializeUserIfAvaliable,
  auth.requireUserIfAvaliable(['admin', 'hr']),
  validate(jobOpeningSchema.getJobOpeningSchema),
  jobOpeningController.getJobOpeningHandler,
);

router.get(
  '/:id',
  auth.deserializeUserIfAvaliable,
  auth.requireUserIfAvaliable(['admin', 'hr']),
  validate(jobOpeningSchema.getJobOpeningByIdSchema),
  jobOpeningController.getJobOpeningById,
);

router.post(
  '/create',
  auth.deserializeUser,
  auth.requireUser(['admin', 'hr']),
  validate(jobOpeningSchema.createJobOpeningSchema),
  jobOpeningController.createJobOpeningHandler,
);

router.post(
  '/apply',
  resumeUpload.single('resume'),
  validateFilePresence(1, 1),
  validate(jobOpeningSchema.applyJobOpeningSchema),
  jobOpeningController.applyJobOpeningHandler,
);

router.delete(
  '/delete/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'hr']),
  validate(jobOpeningSchema.deleteJobOpeningSchema),
  jobOpeningController.deleteJobOpeningHandler,
);

router.patch(
  '/update/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'hr']),
  validate(jobOpeningSchema.updateJobOpeningSchema),
  jobOpeningController.updateJobOpeningHandler,
);

export default router;
