import express from 'express';
import { validate } from '../modules/validation/validate.middleware';
import { auth } from '../modules/auth';
import { jobOpeningController, jobOpeningSchema } from '../modules/jobOpening';

const router = express.Router();

router.get(
  '/',
  validate(jobOpeningSchema.getJobOpeningSchema),
  jobOpeningController.getJobOpeningHandler,
);

router.get(
  '/:id',
  auth.deserializeUser,
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
