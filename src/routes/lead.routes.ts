import express from 'express';
import { validate } from '../modules/validation/validate.middleware';
import { auth } from '../modules/auth';
import { leadController, leadSchema } from '../modules/lead';

const router = express.Router();

router.use(auth.deserializeUser, auth.requireUser(['admin', 'sales']));

router.get('/', validate(leadSchema.getLeadSchema), leadController.getLeadHandler);

router.get('/:id', validate(leadSchema.getUniqueLead), leadController.getUniqueLead);

router.post('/create', validate(leadSchema.createLeadSchema), leadController.createLeadHandler);

router.patch(
  '/update/:id',
  validate(leadSchema.updateLeadSchema),
  leadController.updateLeadHandler,
);

export default router;
