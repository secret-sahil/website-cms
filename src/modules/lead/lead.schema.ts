import { JobTitles } from '@prisma/client';
import { boolean, nativeEnum, object, string, TypeOf } from 'zod';

export const createLeadSchema = object({
  body: object({
    fullName: string({ required_error: 'Full name is required.' }),
    email: string({ required_error: 'Email is required.' }).email('Invalid email format.'),
    phone: string({ required_error: 'Phone number is required.' }).max(15, {
      message: 'Invalid phone number.',
    }),
    jobTitle: nativeEnum(JobTitles).optional(),
    companySize: string().optional(),
    company: string().optional(),
    message: string({}).optional(),
    budget: string({}).optional(),
    source: string({ required_error: 'Source is required.' }),
  }),
});

export const updateLeadSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }).uuid('Invalid id format.'),
  }),
  body: object({
    isOpened: boolean(),
  }).partial(),
});

export const getUniqueLead = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
});

export const getLeadSchema = object({
  query: object({
    search: string(),
    page: string(),
    limit: string(),
  }).partial(),
});

export type createLeadInput = TypeOf<typeof createLeadSchema>['body'];
export type updateLeadInput = TypeOf<typeof updateLeadSchema>;
export type getUniqueLeadInput = TypeOf<typeof getUniqueLead>['params'];
export type getLeadInput = TypeOf<typeof getLeadSchema>['query'];
