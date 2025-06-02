import { Wheredidyouhear } from '@prisma/client';
import { boolean, object, string, TypeOf, z } from 'zod';

export const createJobOpeningSchema = object({
  body: object({
    title: string({ required_error: 'Job title is required.' })
      .min(3, { message: 'Job title is too short.' })
      .max(50, { message: 'Job title is too long.' })
      .trim(),
    description: string({ required_error: 'Job description is required.' }),
    locationId: string({ required_error: 'Location is required.' }),
    experience: string({ required_error: 'Experience is required.' }),
  }),
});

export const updateJobOpeningSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }).uuid('Invalid id format.'),
  }),
  body: object({
    title: string()
      .min(3, { message: 'Job title is too short.' })
      .max(50, { message: 'Job title is too long.' })
      .trim(),
    description: string(),
    locationId: string(),
    experience: string(),
    isPublished: boolean(),
  }).partial(),
});

export const deleteJobOpeningSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }).uuid('Invalid id format.'),
  }),
});

export const getJobOpeningByIdSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }).uuid('Invalid id format.'),
  }),
});

export const getJobOpeningSchema = object({
  query: object({
    search: string(),
    page: string(),
    limit: string(),
  }).partial(),
});

export const applyJobOpeningSchema = object({
  body: object({
    jobOpeningId: string({ required_error: 'Job Id is required.' }).uuid('Invalid id format.'),
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

export type applyJobOpeningInput = TypeOf<typeof applyJobOpeningSchema>['body'];
export type createJobOpeningInput = TypeOf<typeof createJobOpeningSchema>['body'];
export type updateJobOpeningInput = TypeOf<typeof updateJobOpeningSchema>;
export type deleteJobOpeningInput = TypeOf<typeof deleteJobOpeningSchema>['params'];
export type getJobOpeningByIdInput = TypeOf<typeof getJobOpeningByIdSchema>['params'];
export type getJobOpeningInput = TypeOf<typeof getJobOpeningSchema>['query'];
