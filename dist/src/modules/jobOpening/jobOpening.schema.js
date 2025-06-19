"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyJobOpeningSchema = exports.getJobOpeningSchema = exports.getJobOpeningByIdSchema = exports.deleteJobOpeningSchema = exports.updateJobOpeningSchema = exports.createJobOpeningSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.createJobOpeningSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({ required_error: 'Job title is required.' })
            .min(3, { message: 'Job title is too short.' })
            .max(50, { message: 'Job title is too long.' })
            .trim(),
        description: (0, zod_1.string)({ required_error: 'Job description is required.' }),
        locationId: (0, zod_1.string)({ required_error: 'Location is required.' }),
        experience: (0, zod_1.string)({ required_error: 'Experience is required.' }),
    }),
});
exports.updateJobOpeningSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }).uuid('Invalid id format.'),
    }),
    body: (0, zod_1.object)({
        title: (0, zod_1.string)()
            .min(3, { message: 'Job title is too short.' })
            .max(50, { message: 'Job title is too long.' })
            .trim(),
        description: (0, zod_1.string)(),
        locationId: (0, zod_1.string)(),
        experience: (0, zod_1.string)(),
        isPublished: (0, zod_1.boolean)(),
    }).partial(),
});
exports.deleteJobOpeningSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }).uuid('Invalid id format.'),
    }),
});
exports.getJobOpeningByIdSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }).uuid('Invalid id format.'),
    }),
});
exports.getJobOpeningSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        search: (0, zod_1.string)(),
        page: (0, zod_1.string)(),
        limit: (0, zod_1.string)(),
    }).partial(),
});
exports.applyJobOpeningSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        jobOpeningId: (0, zod_1.string)({ required_error: 'Job Id is required.' }).uuid('Invalid id format.'),
        fullName: (0, zod_1.string)({ required_error: 'Full name is required.' }),
        email: (0, zod_1.string)({ required_error: 'Email is required.' }).email('Invalid email format.'),
        phone: (0, zod_1.string)({ required_error: 'Phone number is required.' }),
        coverLetter: (0, zod_1.string)({ required_error: 'Cover letter is required.' }),
        linkedIn: (0, zod_1.string)().url('Invalid URL format.').optional(),
        wheredidyouhear: zod_1.z.nativeEnum(client_1.Wheredidyouhear, {
            required_error: 'Where did you hear about us is required.',
        }),
        hasSubscribedToNewsletter: zod_1.z.enum(['yes', 'no']).optional(),
    }),
});
//# sourceMappingURL=jobOpening.schema.js.map