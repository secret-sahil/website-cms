import express from 'express';
import { validate } from '../modules/validation/validate.middleware';
import { auth } from '../modules/auth';
import { leadController, leadSchema } from '../modules/lead';

const router = express.Router();

router.get(
  '/',
  auth.deserializeUser,
  auth.requireUser(['admin', 'sales']),
  validate(leadSchema.getLeadSchema),
  leadController.getLeadHandler,
);

router.get(
  '/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'sales']),
  validate(leadSchema.getUniqueLead),
  leadController.getUniqueLead,
);

router.post('/create', validate(leadSchema.createLeadSchema), leadController.createLeadHandler);

router.patch(
  '/update/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'sales']),
  validate(leadSchema.updateLeadSchema),
  leadController.updateLeadHandler,
);

export default router;
