import { object, string, TypeOf } from 'zod';

export const createOfficeSchema = object({
  body: object({
    name: string({ required_error: 'Name is required.' })
      .min(3, { message: 'Name is too short.' })
      .max(30, { message: 'Name is too long.' })
      .trim(),
    address: string({ required_error: 'Address is required.' }).trim(),
    city: string({ required_error: 'City is required.' }).trim(),
    state: string({ required_error: 'State is required.' }).trim(),
    country: string({ required_error: 'Country is required.' }).trim(),
    postalCode: string({ required_error: 'Postal Code is required.' }).trim(),
  }),
});

export const updateOfficeSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
  body: object({
    name: string({ required_error: 'Name is required.' })
      .min(3, { message: 'Name is too short.' })
      .max(30, { message: 'Name is too long.' })
      .trim(),
    address: string({ required_error: 'Address is required.' }).trim(),
    city: string({ required_error: 'City is required.' }).trim(),
    state: string({ required_error: 'State is required.' }).trim(),
    country: string({ required_error: 'Country is required.' }).trim(),
    postalCode: string({ required_error: 'Postal Code is required.' }).trim(),
  }).partial(),
});

export const deleteOfficeSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
});

export const getOfficeByIdSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
});

export const getOfficeSchema = object({
  query: object({
    search: string(),
    page: string(),
    limit: string(),
  }).partial(),
});

export type createOfficeInput = TypeOf<typeof createOfficeSchema>['body'];
export type updateOfficeInput = TypeOf<typeof updateOfficeSchema>;
export type deleteOfficeInput = TypeOf<typeof deleteOfficeSchema>['params'];
export type getOfficeByIdInput = TypeOf<typeof getOfficeByIdSchema>['params'];
export type getOfficeInput = TypeOf<typeof getOfficeSchema>['query'];
