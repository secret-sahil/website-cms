"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllJobOpening = exports.getUniqueJobOpening = exports.updateJobOpening = exports.deleteJobOpening = exports.createJobApplication = exports.createJobOpening = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createJobOpening = async (input, select) => {
    return (await prisma.jobOpening.create({
        data: input,
        select,
    }));
};
exports.createJobOpening = createJobOpening;
const createJobApplication = async (input, select) => {
    return await prisma.application.create({
        data: input,
        select,
    });
};
exports.createJobApplication = createJobApplication;
const deleteJobOpening = async (where) => {
    return (await prisma.jobOpening.delete({
        where,
    }));
};
exports.deleteJobOpening = deleteJobOpening;
const updateJobOpening = async (where, data, select) => {
    return (await prisma.jobOpening.update({
        data,
        where,
        select,
    }));
};
exports.updateJobOpening = updateJobOpening;
const getUniqueJobOpening = async (where, include) => {
    return (await prisma.jobOpening.findUnique({
        where,
        include,
    }));
};
exports.getUniqueJobOpening = getUniqueJobOpening;
const getAllJobOpening = async (search, page = 1, pageSize, where, include, orderBy = 'desc') => {
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const [data, total] = await Promise.all([
        prisma.jobOpening.findMany({
            where: {
                ...where,
                title: {
                    contains: search,
                    mode: 'insensitive',
                },
            },
            skip,
            take: pageSize,
            include,
            orderBy: {
                createdAt: orderBy,
            },
        }),
        prisma.jobOpening.count({
            where: {
                ...where,
                title: {
                    contains: search,
                    mode: 'insensitive',
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
exports.getAllJobOpening = getAllJobOpening;
//# sourceMappingURL=jobOpening.service.js.map