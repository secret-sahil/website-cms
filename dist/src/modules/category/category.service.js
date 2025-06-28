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
exports.getAllCategory = exports.getUniqueCategory = exports.updateCategory = exports.deleteCategory = exports.createCategory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCategory = (input, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.category.create({
        data: input,
        select,
    }));
});
exports.createCategory = createCategory;
const deleteCategory = (where) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.category.delete({
        where,
    }));
});
exports.deleteCategory = deleteCategory;
const updateCategory = (where, data, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.category.update({
        data,
        where,
        select,
    }));
});
exports.updateCategory = updateCategory;
const getUniqueCategory = (where, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.category.findUnique({
        where,
        select,
    }));
});
exports.getUniqueCategory = getUniqueCategory;
const getAllCategory = (search_1, ...args_1) => __awaiter(void 0, [search_1, ...args_1], void 0, function* (search, page = 1, pageSize, where, select) {
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const [data, total] = yield Promise.all([
        prisma.category.findMany({
            where: Object.assign(Object.assign({}, where), { name: {
                    contains: search,
                    mode: 'insensitive', // Optional: case-insensitive search
                } }),
            skip,
            take: pageSize,
            select,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.category.count({
            where: Object.assign(Object.assign({}, where), { name: {
                    contains: search,
                    mode: 'insensitive', // Ensure the count query matches the findMany query
                } }),
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
exports.getAllCategory = getAllCategory;
//# sourceMappingURL=category.service.js.map