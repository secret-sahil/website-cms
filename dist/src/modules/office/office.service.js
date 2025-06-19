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
exports.getAllOffice = exports.getUniqueOffice = exports.updateOffice = exports.deleteOffice = exports.createOffice = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOffice = (input, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.office.create({
        data: input,
        select,
    }));
});
exports.createOffice = createOffice;
const deleteOffice = (where) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.office.delete({
        where,
    }));
});
exports.deleteOffice = deleteOffice;
const updateOffice = (where, data, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.office.update({
        data,
        where,
        select,
    }));
});
exports.updateOffice = updateOffice;
const getUniqueOffice = (where, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.office.findUnique({
        where,
        select,
    }));
});
exports.getUniqueOffice = getUniqueOffice;
const getAllOffice = (search_1, ...args_1) => __awaiter(void 0, [search_1, ...args_1], void 0, function* (search, page = 1, pageSize, where, select) {
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const [data, total] = yield Promise.all([
        prisma.office.findMany({
            where: Object.assign(Object.assign({}, where), { name: {
                    contains: search,
                    mode: 'insensitive', // Optional: case-insensitive search
                } }),
            skip,
            take: pageSize,
            select,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.office.count({
            where: Object.assign(Object.assign({}, where), { name: {
                    contains: search,
                    mode: 'insensitive', // Ensure the count query matches the findMany query
                } }),
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
});
exports.getAllOffice = getAllOffice;
//# sourceMappingURL=office.service.js.map