"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategorySchema = exports.getCategoryByIdSchema = exports.deleteCategorySchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'Name is required.' })
            .min(3, { message: 'Name is too short.' })
            .max(30, { message: 'Name is too long.' })
            .trim(),
    }),
});
exports.updateCategorySchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }),
    }),
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'Name is required.' })
            .min(3, { message: 'Name is too short.' })
            .max(30, { message: 'Name is too long.' })
            .trim(),
    }).partial(),
});
exports.deleteCategorySchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }),
    }),
});
exports.getCategoryByIdSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }),
    }),
});
exports.getCategorySchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        search: (0, zod_1.string)(),
        page: (0, zod_1.string)(),
        limit: (0, zod_1.string)(),
    }).partial(),
});
//# sourceMappingURL=category.schema.js.map