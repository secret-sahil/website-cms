"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLead = exports.getUniqueLead = exports.updateLead = exports.deleteLead = exports.createLead = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createLead = async (input, select) => {
    return (await prisma.lead.create({
        data: input,
        select,
    }));
};
exports.createLead = createLead;
const deleteLead = async (where) => {
    return (await prisma.lead.delete({
        where: {
            ...where,
        },
    }));
};
exports.deleteLead = deleteLead;
const updateLead = async (where, data, select) => {
    return (await prisma.lead.update({
        data,
        where: {
            ...where,
        },
        select,
    }));
};
exports.updateLead = updateLead;
const getUniqueLead = async (where, select) => {
    return (await prisma.lead.findUnique({
        where: {
            ...where,
        },
        select,
    }));
};
exports.getUniqueLead = getUniqueLead;
const getAllLead = async (search, page = 1, pageSize, where, select, orderBy = 'desc') => {
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const [data, total] = await Promise.all([
        prisma.lead.findMany({
            where: {
                ...where,
                email: {
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
        prisma.lead.count({
            where: {
                ...where,
                email: {
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
exports.getAllLead = getAllLead;
//# sourceMappingURL=lead.service.js.map