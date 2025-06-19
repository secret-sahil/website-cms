"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllApplication = exports.getUniqueApplication = exports.updateApplication = exports.deleteApplication = exports.createApplication = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createApplication = async (input, include) => {
    return (await prisma.application.create({
        data: input,
        include,
    }));
};
exports.createApplication = createApplication;
const deleteApplication = async (where) => {
    return (await prisma.application.delete({
        where,
    }));
};
exports.deleteApplication = deleteApplication;
const updateApplication = async (where, data, include) => {
    return (await prisma.application.update({
        data,
        where,
        include,
    }));
};
exports.updateApplication = updateApplication;
const getUniqueApplication = async (where, include) => {
    return (await prisma.application.findUnique({
        where,
        include,
    }));
};
exports.getUniqueApplication = getUniqueApplication;
const getAllApplication = async (search, page = 1, pageSize, where, include) => {
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const [data, total] = await Promise.all([
        prisma.application.findMany({
            where: {
                ...where,
                email: {
                    contains: search,
                    mode: 'insensitive', // Optional: case-insensitive search
                },
            },
            skip,
            take: pageSize,
            include,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.application.count({
            where: {
                ...where,
                email: {
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
exports.getAllApplication = getAllApplication;
//# sourceMappingURL=application.service.js.map