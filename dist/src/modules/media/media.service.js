"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMedia = exports.getUniqueMedia = exports.updateMedia = exports.deleteMedia = exports.createMedia = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createMedia = (input, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.media.create({
        data: input,
        select,
    }));
});
exports.createMedia = createMedia;
const deleteMedia = (where) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.media.delete({
        where,
    }));
});
exports.deleteMedia = deleteMedia;
const updateMedia = (where, data, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.media.update({
        data,
        where,
        select,
    }));
});
exports.updateMedia = updateMedia;
const getUniqueMedia = (where, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.media.findUnique({
        where,
        select,
    }));
});
exports.getUniqueMedia = getUniqueMedia;
const getAllMedia = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, pageSize, where, include) {
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const [data, total] = yield Promise.all([
        prisma.media.findMany({
            where: where,
            skip,
            take: pageSize,
            include,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.media.count({
            where: where,
            orderBy: {
                createdAt: 'desc',
            },
        }),
    ]);
    return {
        data,
        total,
        page,
        totalPages: pageSize ? Math.ceil(total / pageSize) : 1,
    };
});
exports.getAllMedia = getAllMedia;
//# sourceMappingURL=media.service.js.map