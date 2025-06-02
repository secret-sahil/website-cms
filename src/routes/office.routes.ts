import express from 'express';
import { validate } from '../modules/validation/validate.middleware';
import { auth } from '../modules/auth';
import { officeController, officeSchema } from '../modules/office';

const router = express.Router();

router.get(
  '/',
  auth.deserializeUserIfAvaliable,
  auth.requireUserIfAvaliable(['admin', 'content']),
  validate(officeSchema.getOfficeSchema),
  officeController.getOfficeHandler,
);

router.get(
  '/:id',
  auth.deserializeUserIfAvaliable,
  auth.requireUserIfAvaliable(['admin', 'content']),
  validate(officeSchema.getUniqueOffice),
  officeController.getUniqueOffice,
);

router.post(
  '/create',
  auth.deserializeUser,
  auth.requireUser(['admin', 'content']),
  validate(officeSchema.createOfficeSchema),
  officeController.createOfficeHandler,
);

router.delete(
  '/delete/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'content']),
  validate(officeSchema.deleteOfficeSchema),
  officeController.deleteOfficeHandler,
);

router.patch(
  '/update/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'content']),
  validate(officeSchema.updateOfficeSchema),
  officeController.updateOfficeHandler,
);

export default router;
