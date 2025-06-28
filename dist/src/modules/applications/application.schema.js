"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationSchema = exports.getApplicationByIdSchema = exports.deleteApplicationSchema = exports.updateApplicationSchema = void 0;
const zod_1 = require("zod");
exports.updateApplicationSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }),
    }),
    body: (0, zod_1.object)({
        status: zod_1.z.enum(['in_review', 'hired', 'rejected']),
        isOpened: (0, zod_1.boolean)(),
    }).partial(),
});
exports.deleteApplicationSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }),
    }),
});
exports.getApplicationByIdSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }),
    }),
});
exports.getApplicationSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        search: (0, zod_1.string)(),
        page: (0, zod_1.string)(),
        limit: (0, zod_1.string)(),
        jobOpeningId: (0, zod_1.string)().uuid(),
    }).partial(),
});
//# sourceMappingURL=application.schema.js.map