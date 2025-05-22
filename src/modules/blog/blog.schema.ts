import { Wheredidyouhear } from '@prisma/client';
import { boolean, object, string, TypeOf, z } from 'zod';

export const createBlogSchema = object({
  body: object({
    title: string({ required_error: 'Job title is required.' })
      .min(3, { message: 'Job title is too short.' })
      .max(250, { message: 'Job title is too long.' })
      .trim()
      .toLowerCase(),
    description: string({ required_error: 'Job description is required.' }),
    content: string({ required_error: 'Job content is required.' }),
    featuredImageId: string(),
    categoryIds: string({ required_error: 'Cate  gory is required.' }).array(),
    tags: string({ required_error: 'Tag(s) are required.' }).array(),
  }),
});

export const updateBlogSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }).uuid('Invalid id format.'),
  }),
  body: object({
    title: string()
      .min(3, { message: 'Job title is too short.' })
      .max(250, { message: 'Job title is too long.' })
      .trim()
      .toLowerCase(),
    description: string(),
    content: string(),
    featuredImageId: string(),
    categoryIds: string().array(),
    tags: string().array(),
    isPublished: boolean(),
  }).partial(),
});

export const deleteBlogSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }).uuid('Invalid id format.'),
  }),
});

export const getBlogByIdSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }).uuid('Invalid id format.'),
  }),
});

export const getBlogSchema = object({
  query: object({
    search: string(),
    page: string(),
    limit: string(),
  }).partial(),
});

export const applyBlogSchema = object({
  body: object({
    blogId: string({ required_error: 'Job Id is required.' }).uuid('Invalid id format.'),
    fullName: string({ required_error: 'Full name is required.' }),
    email: string({ required_error: 'Email is required.' }).email('Invalid email format.'),
    phone: string({ required_error: 'Phone number is required.' }),
    coverLetter: string({ required_error: 'Cover letter is required.' }),
    linkedIn: string().url('Invalid URL format.').optional(),
    wheredidyouhear: z.nativeEnum(Wheredidyouhear, {
      required_error: 'Where did you hear about us is required.',
    }),
    hasSubscribedToNewsletter: z.enum(['yes', 'no']).optional(),
  }),
});

export type applyBlogInput = TypeOf<typeof applyBlogSchema>['body'];
export type createBlogInput = TypeOf<typeof createBlogSchema>['body'];
export type updateBlogInput = TypeOf<typeof updateBlogSchema>;
export type deleteBlogInput = TypeOf<typeof deleteBlogSchema>['params'];
export type getBlogByIdInput = TypeOf<typeof getBlogByIdSchema>['params'];
export type getBlogInput = TypeOf<typeof getBlogSchema>['query'];
