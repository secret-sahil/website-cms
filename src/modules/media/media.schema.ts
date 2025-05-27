import { object, string, TypeOf } from 'zod';

export const updateMediaSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
});

export const deleteMediaSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
});

export const getMediaByIdSchema = object({
  params: object({
    id: string({ required_error: 'Id is required.' }),
  }),
});

export const getMediaSchema = object({
  query: object({
    type: string(),
    page: string(),
    limit: string(),
  }).partial(),
});

export type updateMediaInput = TypeOf<typeof updateMediaSchema>;
export type deleteMediaInput = TypeOf<typeof deleteMediaSchema>['params'];
export type getMediaByIdInput = TypeOf<typeof getMediaByIdSchema>['params'];
export type getMediaInput = TypeOf<typeof getMediaSchema>['query'];
