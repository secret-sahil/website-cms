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
exports.getAllUsers = exports.countUsers = exports.updateUser = exports.findUniqueUser = exports.findUser = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = (input, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.user.create({
        data: input,
        select,
    }));
});
exports.createUser = createUser;
const findUser = (where, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.user.findFirst({
        where,
        select,
    }));
});
exports.findUser = findUser;
const findUniqueUser = (where, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.user.findUnique({
        where,
        select,
    }));
});
exports.findUniqueUser = findUniqueUser;
const updateUser = (where, data, select) => __awaiter(void 0, void 0, void 0, function* () {
    if (!where.id) {
        throw new Error('At least one unique identifier (id, phone, or username) must be provided.');
    }
    return (yield prisma.user.update({ where, data, select }));
});
exports.updateUser = updateUser;
const countUsers = (where) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.count({
        where,
    });
});
exports.countUsers = countUsers;
const getAllUsers = (where, select) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.findMany({
        where: Object.assign({}, where),
        select,
    });
});
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=user.service.js.map