"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaSchema = exports.getMediaByIdSchema = exports.deleteMediaSchema = exports.updateMediaSchema = void 0;
const zod_1 = require("zod");
exports.updateMediaSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }),
    }),
});
exports.deleteMediaSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }),
    }),
});
exports.getMediaByIdSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }),
    }),
});
exports.getMediaSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        type: (0, zod_1.string)(),
        page: (0, zod_1.string)(),
        limit: (0, zod_1.string)(),
    }).partial(),
});
//# sourceMappingURL=media.schema.js.map