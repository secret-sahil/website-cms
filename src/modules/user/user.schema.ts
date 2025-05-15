/* eslint-disable no-unused-vars */
import { nativeEnum, object, string, TypeOf } from 'zod';

enum RoleEnumType {
  ADMIN = 'admin',
  USER = 'user',
  COMPANY = 'company',
}

export const verifyEmailSchema = object({
  params: object({
    verificationCode: string(),
  }),
});

export const updateUserSchema = object({
  body: object({
    firstName: string(),
    lastName: string(),
  }).partial(),
});

export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>['params'];
export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];
