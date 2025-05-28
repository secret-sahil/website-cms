import express from 'express';
import { validate } from '../modules/validation/validate.middleware';
import { auth } from '../modules/auth';
import { leadController, leadSchema } from '../modules/lead';

const router = express.Router();

router.get(
  '/',
  auth.deserializeUserIfAvaliable,
  auth.requireUserIfAvaliable(['admin', 'content']),
  validate(leadSchema.getLeadSchema),
  leadController.getLeadHandler,
);

router.get(
  '/:id',
  auth.deserializeUserIfAvaliable,
  auth.requireUserIfAvaliable(['admin', 'content']),
  validate(leadSchema.getUniqueLead),
  leadController.getUniqueLead,
);

router.post(
  '/create',
  auth.deserializeUser,
  auth.requireUser(['admin', 'content']),
  validate(leadSchema.createLeadSchema),
  leadController.createLeadHandler,
);

router.patch(
  '/update/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'content']),
  validate(leadSchema.updateLeadSchema),
  leadController.updateLeadHandler,
);

export default router;
