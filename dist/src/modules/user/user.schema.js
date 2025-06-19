"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.verifyEmailSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.verifyEmailSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        verificationCode: (0, zod_1.string)(),
    }),
});
exports.updateUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({ required_error: 'First name is required.' }),
        lastName: (0, zod_1.string)({ required_error: 'Last name is required.' }),
        password: (0, zod_1.string)({ required_error: 'Password is required.' }),
        role: (0, zod_1.nativeEnum)(client_1.RoleEnumType, {
            required_error: 'Role is required.',
        }),
    }).partial(),
});
//# sourceMappingURL=user.schema.js.map