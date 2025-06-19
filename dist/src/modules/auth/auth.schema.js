"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithPasswordSchema = exports.changePasswordSchema = exports.registerUserSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.registerUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({ required_error: 'First name is required.' }),
        lastName: (0, zod_1.string)({ required_error: 'Last name is required.' }),
        username: zod_1.z
            .string()
            .min(1, { message: 'Username must be at least 1 character long' })
            .max(30, { message: "Username can't be longer than 30 characters" })
            .regex(/^(?!.*[_.]{2})(?![_.])(?!.*[_.]$)[a-zA-Z0-9._]+$/, {
            message: 'Invalid username format',
        }),
        email: (0, zod_1.string)({ required_error: 'email number is required.' }).optional(),
        password: (0, zod_1.string)({ required_error: 'Password is required.' }),
        role: (0, zod_1.nativeEnum)(client_1.RoleEnumType, {
            required_error: 'Role is required.',
        }),
    }),
});
exports.changePasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        password: (0, zod_1.string)({ required_error: 'Password is required.' }).min(8, 'Password is too short - should be 8 chars minimum.'),
    }),
});
exports.loginWithPasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        username: zod_1.z
            .string()
            .min(1, { message: 'Invalid username' })
            .max(30, { message: 'Invalid username' })
            .regex(/^(?!.*[_.]{2})(?![_.])(?!.*[_.]$)[a-zA-Z0-9._]+$/, {
            message: 'Invalid username',
        }),
        password: (0, zod_1.string)({ required_error: 'Password is required.' }),
    }),
});
//# sourceMappingURL=auth.schema.js.map