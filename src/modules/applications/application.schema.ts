import { ApplicationStatus } from '@prisma/client';
import { nativeEnum, object, string, TypeOf } from 'zod';

export const updateApplicationSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
  body: object({
    status: nativeEnum(ApplicationStatus),
  }).partial(),
});

export const deleteApplicationSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
});

export const getApplicationByIdSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
});

export const getApplicationSchema = object({
  query: object({
    search: string(),
    page: string(),
    limit: string(),
  }).partial(),
});

export type updateApplicationInput = TypeOf<typeof updateApplicationSchema>;
export type deleteApplicationInput = TypeOf<typeof deleteApplicationSchema>['params'];
export type getApplicationByIdInput = TypeOf<typeof getApplicationByIdSchema>['params'];
export type getApplicationInput = TypeOf<typeof getApplicationSchema>['query'];
