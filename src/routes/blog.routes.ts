import express from 'express';
import { validate } from '../modules/validation/validate.middleware';
import { auth } from '../modules/auth';
import { blogController, blogSchema } from '../modules/blog';

const router = express.Router();

router.get(
  '/',
  auth.deserializeUserIfAvaliable,
  auth.requireUserIfAvaliable(['admin', 'content']),
  validate(blogSchema.getBlogSchema),
  blogController.getBlogHandler,
);

router.get(
  '/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'content']),
  validate(blogSchema.getBlogByIdSchema),
  blogController.getBlogById,
);

router.post(
  '/create',
  auth.deserializeUser,
  auth.requireUser(['admin', 'content']),
  validate(blogSchema.createBlogSchema),
  blogController.createBlogHandler,
);

router.delete(
  '/delete/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'content']),
  validate(blogSchema.deleteBlogSchema),
  blogController.deleteBlogHandler,
);

router.patch(
  '/update/:id',
  auth.deserializeUser,
  auth.requireUser(['admin', 'content']),
  validate(blogSchema.updateBlogSchema),
  blogController.updateBlogHandler,
);

export default router;
