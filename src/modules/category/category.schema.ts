import { boolean, object, string, TypeOf } from 'zod';

export const createCategorySchema = object({
  body: object({
    name: string({ required_error: 'Name is required.' })
      .min(3, { message: 'Name is too short.' })
      .max(30, { message: 'Name is too long.' })
      .trim()
      .toLowerCase(),
  }),
});

export const updateCategorySchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
  body: object({
    name: string({ required_error: 'Name is required.' })
      .min(3, { message: 'Name is too short.' })
      .max(30, { message: 'Name is too long.' })
      .trim()
      .toLowerCase(),
    isPublished: boolean(),
  }).partial(),
});

export const deleteCategorySchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
});

export const getCategoryByIdSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
});

export const getCategorySchema = object({
  query: object({
    search: string(),
    page: string(),
    limit: string(),
    is_deleted: string(),
  }).partial(),
});

export type createCategoryInput = TypeOf<typeof createCategorySchema>['body'];
export type updateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type deleteCategoryInput = TypeOf<typeof deleteCategorySchema>['params'];
export type getCategoryByIdInput = TypeOf<typeof getCategoryByIdSchema>['params'];
export type getCategoryInput = TypeOf<typeof getCategorySchema>['query'];
