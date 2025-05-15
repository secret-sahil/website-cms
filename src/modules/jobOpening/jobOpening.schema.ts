import { boolean, object, string, TypeOf } from 'zod';

export const createJobOpeningSchema = object({
  body: object({
    title: string({ required_error: 'Job title is required.' })
      .min(3, { message: 'Job title is too short.' })
      .max(50, { message: 'Job title is too long.' })
      .trim()
      .toLowerCase(),
    description: string({ required_error: 'Job description is required.' }),
    locationId: string({ required_error: 'Location is required.' }),
    experience: string({ required_error: 'Experience is required.' }),
  }),
});

export const updateJobOpeningSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
  body: object({
    title: string()
      .min(3, { message: 'Job title is too short.' })
      .max(50, { message: 'Job title is too long.' })
      .trim()
      .toLowerCase(),
    description: string(),
    locationId: string(),
    experience: string(),
    isPublished: boolean(),
  }).partial(),
});

export const deleteJobOpeningSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
});

export const getJobOpeningByIdSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
});

export const getJobOpeningSchema = object({
  query: object({
    search: string(),
    page: string(),
    limit: string(),
    is_deleted: string(),
  }).partial(),
});

export type createJobOpeningInput = TypeOf<typeof createJobOpeningSchema>['body'];
export type updateJobOpeningInput = TypeOf<typeof updateJobOpeningSchema>;
export type deleteJobOpeningInput = TypeOf<typeof deleteJobOpeningSchema>['params'];
export type getJobOpeningByIdInput = TypeOf<typeof getJobOpeningByIdSchema>['params'];
export type getJobOpeningInput = TypeOf<typeof getJobOpeningSchema>['query'];
