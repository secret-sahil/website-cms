import { RoleEnumType } from '@prisma/client';
import { nativeEnum, object, string, TypeOf, z } from 'zod';

export const verifyEmailSchema = object({
  params: object({
    verificationCode: string(),
  }),
});

export const updateUserSchema = object({
  body: object({
    firstName: string({ required_error: 'First name is required.' }),
    lastName: string({ required_error: 'Last name is required.' }),
    username: z
      .string()
      .min(1, { message: 'Username must be at least 1 character long' })
      .max(30, { message: "Username can't be longer than 30 characters" })
      .regex(/^(?!.*[_.]{2})(?![_.])(?!.*[_.]$)[a-zA-Z0-9._]+$/, {
        message: 'Invalid username format',
      }),
    email: string({ required_error: 'email number is required.' }).optional(),
    password: string({ required_error: 'Password is required.' }),
    role: nativeEnum(RoleEnumType, {
      required_error: 'Role is required.',
    }),
  }).partial(),
});

export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>['params'];
export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];
