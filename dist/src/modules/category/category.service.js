"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategory = exports.getUniqueCategory = exports.updateCategory = exports.deleteCategory = exports.createCategory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCategory = async (input, select) => {
    return (await prisma.category.create({
        data: input,
        select,
    }));
};
exports.createCategory = createCategory;
const deleteCategory = async (where) => {
    return (await prisma.category.delete({
        where,
    }));
};
exports.deleteCategory = deleteCategory;
const updateCategory = async (where, data, select) => {
    return (await prisma.category.update({
        data,
        where,
        select,
    }));
};
exports.updateCategory = updateCategory;
const getUniqueCategory = async (where, select) => {
    return (await prisma.category.findUnique({
        where,
        select,
    }));
};
exports.getUniqueCategory = getUniqueCategory;
const getAllCategory = async (search, page = 1, pageSize, where, select) => {
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const [data, total] = await Promise.all([
        prisma.category.findMany({
            where: {
                ...where,
                name: {
                    contains: search,
                    mode: 'insensitive', // Optional: case-insensitive search
                },
            },
            skip,
            take: pageSize,
            select,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.category.count({
            where: {
                ...where,
                name: {
                    contains: search,
                    mode: 'insensitive', // Ensure the count query matches the findMany query
                },
            },
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
};
exports.getAllCategory = getAllCategory;
//# sourceMappingURL=category.service.js.map