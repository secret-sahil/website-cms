"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMedia = exports.getUniqueMedia = exports.updateMedia = exports.deleteMedia = exports.createMedia = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createMedia = async (input, select) => {
    return (await prisma.media.create({
        data: input,
        select,
    }));
};
exports.createMedia = createMedia;
const deleteMedia = async (where) => {
    return (await prisma.media.delete({
        where,
    }));
};
exports.deleteMedia = deleteMedia;
const updateMedia = async (where, data, select) => {
    return (await prisma.media.update({
        data,
        where,
        select,
    }));
};
exports.updateMedia = updateMedia;
const getUniqueMedia = async (where, select) => {
    return (await prisma.media.findUnique({
        where,
        select,
    }));
};
exports.getUniqueMedia = getUniqueMedia;
const getAllMedia = async (page = 1, pageSize, where, include) => {
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const [data, total] = await Promise.all([
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
};
exports.getAllMedia = getAllMedia;
//# sourceMappingURL=media.service.js.map