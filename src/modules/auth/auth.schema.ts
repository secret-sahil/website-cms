import { RoleEnumType } from '@prisma/client';
import { nativeEnum, object, string, TypeOf, z } from 'zod';

export const registerUserSchema = object({
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
  }),
});

export const changePasswordSchema = object({
  body: object({
    password: string({ required_error: 'Password is required.' }).min(
      8,
      'Password is too short - should be 8 chars minimum.',
    ),
  }),
});

export const loginWithPasswordSchema = object({
  body: object({
    username: z
      .string()
      .min(1, { message: 'Invalid username' })
      .max(30, { message: 'Invalid username' })
      .regex(/^(?!.*[_.]{2})(?![_.])(?!.*[_.]$)[a-zA-Z0-9._]+$/, {
        message: 'Invalid username',
      }),
    password: string({ required_error: 'Password is required.' }),
  }),
});

export type changePasswordInput = TypeOf<typeof changePasswordSchema>['body'];
export type registerUserInput = TypeOf<typeof registerUserSchema>['body'];
export type loginWithPasswordInput = TypeOf<typeof loginWithPasswordSchema>['body'];
