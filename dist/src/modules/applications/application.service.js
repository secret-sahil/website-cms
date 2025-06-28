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
exports.getAllApplication = exports.getUniqueApplication = exports.updateApplication = exports.deleteApplication = exports.createApplication = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createApplication = (input, include) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.application.create({
        data: input,
        include,
    }));
});
exports.createApplication = createApplication;
const deleteApplication = (where) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.application.delete({
        where,
    }));
});
exports.deleteApplication = deleteApplication;
const updateApplication = (where, data, include) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.application.update({
        data,
        where,
        include,
    }));
});
exports.updateApplication = updateApplication;
const getUniqueApplication = (where, include) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.application.findUnique({
        where,
        include,
    }));
});
exports.getUniqueApplication = getUniqueApplication;
const getAllApplication = (search_1, ...args_1) => __awaiter(void 0, [search_1, ...args_1], void 0, function* (search, page = 1, pageSize, where, include) {
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const [data, total] = yield Promise.all([
        prisma.application.findMany({
            where: Object.assign(Object.assign({}, where), { email: {
                    contains: search,
                    mode: 'insensitive', // Optional: case-insensitive search
                } }),
            skip,
            take: pageSize,
            include,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.application.count({
            where: Object.assign(Object.assign({}, where), { email: {
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
exports.getAllApplication = getAllApplication;
//# sourceMappingURL=application.service.js.map