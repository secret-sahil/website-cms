import express from 'express';
import { validate } from '../modules/validation/validate.middleware';
import { auth } from '../modules/auth';
import { categoryController, categorySchema } from '../modules/category';

const router = express.Router();

router.get(
  '/',
  auth.deserializeUserIfAvaliable,
  auth.requireUserIfAvaliable(['admin', 'content']),
  validate(categorySchema.getCategorySchema),
  categoryController.getCategoryHandler,
);

router.get(
  '/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'content']),
  validate(categorySchema.getCategoryByIdSchema),
  categoryController.getCategoryById,
);

router.post(
  '/create',
  auth.deserializeUser,
  auth.requireUser(['admin', 'content']),
  validate(categorySchema.createCategorySchema),
  categoryController.createCategoryHandler,
);

router.delete(
  '/delete/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'content']),
  validate(categorySchema.deleteCategorySchema),
  categoryController.deleteCategoryHandler,
);

router.patch(
  '/update/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'content']),
  validate(categorySchema.updateCategorySchema),
  categoryController.updateCategoryHandler,
);

export default router;
