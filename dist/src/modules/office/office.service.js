"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOffice = exports.getUniqueOffice = exports.updateOffice = exports.deleteOffice = exports.createOffice = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOffice = async (input, select) => {
    return (await prisma.office.create({
        data: input,
        select,
    }));
};
exports.createOffice = createOffice;
const deleteOffice = async (where) => {
    return (await prisma.office.delete({
        where,
    }));
};
exports.deleteOffice = deleteOffice;
const updateOffice = async (where, data, select) => {
    return (await prisma.office.update({
        data,
        where,
        select,
    }));
};
exports.updateOffice = updateOffice;
const getUniqueOffice = async (where, select) => {
    return (await prisma.office.findUnique({
        where,
        select,
    }));
};
exports.getUniqueOffice = getUniqueOffice;
const getAllOffice = async (search, page = 1, pageSize, where, select) => {
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const [data, total] = await Promise.all([
        prisma.office.findMany({
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
        prisma.office.count({
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
exports.getAllOffice = getAllOffice;
//# sourceMappingURL=office.service.js.map