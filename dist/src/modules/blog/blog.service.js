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
exports.getAllBlog = exports.getUniqueBlog = exports.updateBlog = exports.deleteBlog = exports.createBlog = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBlog = (input, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.blog.create({
        data: input,
        select,
    }));
});
exports.createBlog = createBlog;
const deleteBlog = (where) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.blog.delete({
        where: Object.assign(Object.assign({}, where), { isDeleted: false }),
    }));
});
exports.deleteBlog = deleteBlog;
const updateBlog = (where, data, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.blog.update({
        data,
        where: Object.assign(Object.assign({}, where), { isDeleted: false }),
        select,
    }));
});
exports.updateBlog = updateBlog;
const getUniqueBlog = (where, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.blog.findUnique({
        where: Object.assign(Object.assign({}, where), { isDeleted: false }),
        select,
    }));
});
exports.getUniqueBlog = getUniqueBlog;
const getAllBlog = (search_1, ...args_1) => __awaiter(void 0, [search_1, ...args_1], void 0, function* (search, page = 1, pageSize, where, select, orderBy = 'desc') {
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const [data, total] = yield Promise.all([
        prisma.blog.findMany({
            where: Object.assign(Object.assign({}, where), { isDeleted: false, title: {
                    contains: search,
                    mode: 'insensitive', // Optional: case-insensitive search
                } }),
            skip,
            take: pageSize,
            select,
            orderBy: {
                createdAt: orderBy,
            },
        }),
        prisma.blog.count({
            where: Object.assign(Object.assign({}, where), { title: {
                    contains: search,
                    mode: 'insensitive', // Ensure the count query matches the findMany query
                } }),
            orderBy: {
                createdAt: orderBy,
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
exports.getAllBlog = getAllBlog;
//# sourceMappingURL=blog.service.js.map