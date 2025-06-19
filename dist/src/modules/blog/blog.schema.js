"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyBlogSchema = exports.getBlogSchema = exports.getUniqueBlog = exports.deleteBlogSchema = exports.updateBlogSchema = exports.createBlogSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.createBlogSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({ required_error: 'Job title is required.' })
            .min(3, { message: 'Job title is too short.' })
            .max(250, { message: 'Job title is too long.' })
            .trim(),
        description: (0, zod_1.string)({ required_error: 'Job description is required.' }).min(30, {
            message: 'Description is too short.',
        }),
        content: (0, zod_1.string)({ required_error: 'Job content is required.' }).min(200, {
            message: 'Content is too short.',
        }),
        featuredImageId: (0, zod_1.string)(),
        categoryIds: (0, zod_1.string)({ required_error: 'Cate  gory is required.' }).array(),
        tags: (0, zod_1.string)({ required_error: 'Tag(s) are required.' }).array(),
    }),
});
exports.updateBlogSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }).uuid('Invalid id format.'),
    }),
    body: (0, zod_1.object)({
        title: (0, zod_1.string)()
            .min(3, { message: 'Job title is too short.' })
            .max(250, { message: 'Job title is too long.' })
            .trim(),
        description: (0, zod_1.string)().min(30, {
            message: 'Description is too short.',
        }),
        content: (0, zod_1.string)().min(200, {
            message: 'Content is too short.',
        }),
        featuredImageId: (0, zod_1.string)(),
        categoryIds: (0, zod_1.string)().array(),
        tags: (0, zod_1.string)().array(),
        isPublished: (0, zod_1.boolean)(),
    }).partial(),
});
exports.deleteBlogSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }).uuid('Invalid id format.'),
    }),
});
exports.getUniqueBlog = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }),
    }),
});
exports.getBlogSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        search: (0, zod_1.string)(),
        page: (0, zod_1.string)(),
        limit: (0, zod_1.string)(),
    }).partial(),
});
exports.applyBlogSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        blogId: (0, zod_1.string)({ required_error: 'Job Id is required.' }).uuid('Invalid id format.'),
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
//# sourceMappingURL=blog.schema.js.map