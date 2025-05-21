import { RoleEnumType } from '@prisma/client';
import { nativeEnum, object, string, TypeOf } from 'zod';

export const verifyEmailSchema = object({
  params: object({
    verificationCode: string(),
  }),
});

export const updateUserSchema = object({
  body: object({
    firstName: string({ required_error: 'First name is required.' }),
    lastName: string({ required_error: 'Last name is required.' }),
    password: string({ required_error: 'Password is required.' }),
    role: nativeEnum(RoleEnumType, {
      required_error: 'Role is required.',
    }),
  }).partial(),
});

export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>['params'];
export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];
