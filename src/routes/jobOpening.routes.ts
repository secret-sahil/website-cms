import express from 'express';
import { validate } from '../modules/validation/validate.middleware';
import { auth } from '../modules/auth';
import { jobOpeningController, jobOpeningSchema } from '../modules/jobOpening';

const router = express.Router();

router.get(
  '/',
  auth.deserializeUser,
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
  validate(jobOpeningSchema.createJobOpeningSchema),
  jobOpeningController.createJobOpeningHandler,
);

router.delete(
  '/delete/:id',
  auth.deserializeUser,
  validate(jobOpeningSchema.deleteJobOpeningSchema),
  jobOpeningController.deleteJobOpeningHandler,
);

router.patch(
  '/update/:id',
  auth.deserializeUser,
  validate(jobOpeningSchema.updateJobOpeningSchema),
  jobOpeningController.updateJobOpeningHandler,
);

export default router;
