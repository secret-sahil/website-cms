"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBlog = exports.getUniqueBlog = exports.updateBlog = exports.deleteBlog = exports.createBlog = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBlog = async (input, select) => {
    return (await prisma.blog.create({
        data: input,
        select,
    }));
};
exports.createBlog = createBlog;
const deleteBlog = async (where) => {
    return (await prisma.blog.delete({
        where: {
            ...where,
            isDeleted: false,
        },
    }));
};
exports.deleteBlog = deleteBlog;
const updateBlog = async (where, data, select) => {
    return (await prisma.blog.update({
        data,
        where: {
            ...where,
            isDeleted: false,
        },
        select,
    }));
};
exports.updateBlog = updateBlog;
const getUniqueBlog = async (where, select) => {
    return (await prisma.blog.findUnique({
        where: {
            ...where,
            isDeleted: false,
        },
        select,
    }));
};
exports.getUniqueBlog = getUniqueBlog;
const getAllBlog = async (search, page = 1, pageSize, where, select, orderBy = 'desc') => {
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const [data, total] = await Promise.all([
        prisma.blog.findMany({
            where: {
                ...where,
                isDeleted: false,
                title: {
                    contains: search,
                    mode: 'insensitive', // Optional: case-insensitive search
                },
            },
            skip,
            take: pageSize,
            select,
            orderBy: {
                createdAt: orderBy,
            },
        }),
        prisma.blog.count({
            where: {
                ...where,
                title: {
                    contains: search,
                    mode: 'insensitive', // Ensure the count query matches the findMany query
                },
            },
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
};
exports.getAllBlog = getAllBlog;
//# sourceMappingURL=blog.service.js.map