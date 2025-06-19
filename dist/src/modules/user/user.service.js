"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.countUsers = exports.updateUser = exports.findUniqueUser = exports.findUser = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = async (input, select) => {
    return (await prisma.user.create({
        data: input,
        select,
    }));
};
exports.createUser = createUser;
const findUser = async (where, select) => {
    return (await prisma.user.findFirst({
        where,
        select,
    }));
};
exports.findUser = findUser;
const findUniqueUser = async (where, select) => {
    return (await prisma.user.findUnique({
        where,
        select,
    }));
};
exports.findUniqueUser = findUniqueUser;
const updateUser = async (where, data, select) => {
    if (!where.id) {
        throw new Error('At least one unique identifier (id, phone, or username) must be provided.');
    }
    return (await prisma.user.update({ where, data, select }));
};
exports.updateUser = updateUser;
const countUsers = async (where) => {
    return prisma.user.count({
        where,
    });
};
exports.countUsers = countUsers;
const getAllUsers = async (where, select) => {
    return prisma.user.findMany({
        where: {
            ...where,
        },
        select,
    });
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=user.service.js.map