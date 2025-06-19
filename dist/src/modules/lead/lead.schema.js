"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeadSchema = exports.getUniqueLead = exports.updateLeadSchema = exports.createLeadSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.createLeadSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        fullName: (0, zod_1.string)({ required_error: 'Full name is required.' }),
        email: (0, zod_1.string)({ required_error: 'Email is required.' }).email('Invalid email format.'),
        phone: (0, zod_1.string)({ required_error: 'Phone number is required.' }).max(16, {
            message: 'Invalid phone number.',
        }),
        jobTitle: (0, zod_1.nativeEnum)(client_1.JobTitles).optional(),
        companySize: (0, zod_1.string)().optional(),
        company: (0, zod_1.string)().optional(),
        message: (0, zod_1.string)({}).optional(),
        budget: (0, zod_1.number)({}).optional(),
        source: (0, zod_1.string)({ required_error: 'Source is required.' }),
    }),
});
exports.updateLeadSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }).uuid('Invalid id format.'),
    }),
    body: (0, zod_1.object)({
        isOpened: (0, zod_1.boolean)(),
    }).partial(),
});
exports.getUniqueLead = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }),
    }),
});
exports.getLeadSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        search: (0, zod_1.string)(),
        page: (0, zod_1.string)(),
        limit: (0, zod_1.string)(),
    }).partial(),
});
//# sourceMappingURL=lead.schema.js.map