import express from 'express';
import { validate } from '../modules/validation/validate.middleware';
import { auth } from '../modules/auth';
import { categoryController, categorySchema } from '../modules/category';

const router = express.Router();

router.get(
  '/',
  auth.deserializeUser,
  validate(categorySchema.getCategorySchema),
  categoryController.getCategoryHandler,
);

router.get(
  '/:id',
  auth.deserializeUser,
  validate(categorySchema.getCategoryByIdSchema),
  categoryController.getCategoryById,
);

router.post(
  '/create',
  auth.deserializeUser,
  validate(categorySchema.createCategorySchema),
  categoryController.createCategoryHandler,
);

router.delete(
  '/delete/:id',
  auth.deserializeUser,
  validate(categorySchema.deleteCategorySchema),
  categoryController.deleteCategoryHandler,
);

router.patch(
  '/update/:id',
  auth.deserializeUser,
  validate(categorySchema.updateCategorySchema),
  categoryController.updateCategoryHandler,
);

export default router;
