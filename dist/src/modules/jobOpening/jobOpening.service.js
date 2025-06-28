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
exports.getAllJobOpening = exports.getUniqueJobOpening = exports.updateJobOpening = exports.deleteJobOpening = exports.createJobApplication = exports.createJobOpening = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createJobOpening = (input, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.jobOpening.create({
        data: input,
        select,
    }));
});
exports.createJobOpening = createJobOpening;
const createJobApplication = (input, select) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.application.create({
        data: input,
        select,
    });
});
exports.createJobApplication = createJobApplication;
const deleteJobOpening = (where) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.jobOpening.delete({
        where,
    }));
});
exports.deleteJobOpening = deleteJobOpening;
const updateJobOpening = (where, data, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.jobOpening.update({
        data,
        where,
        select,
    }));
});
exports.updateJobOpening = updateJobOpening;
const getUniqueJobOpening = (where, include) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.jobOpening.findUnique({
        where,
        include,
    }));
});
exports.getUniqueJobOpening = getUniqueJobOpening;
const getAllJobOpening = (search_1, ...args_1) => __awaiter(void 0, [search_1, ...args_1], void 0, function* (search, page = 1, pageSize, where, include, orderBy = 'desc') {
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const [data, total] = yield Promise.all([
        prisma.jobOpening.findMany({
            where: Object.assign(Object.assign({}, where), { title: {
                    contains: search,
                    mode: 'insensitive',
                } }),
            skip,
            take: pageSize,
            include,
            orderBy: {
                createdAt: orderBy,
            },
        }),
        prisma.jobOpening.count({
            where: Object.assign(Object.assign({}, where), { title: {
                    contains: search,
                    mode: 'insensitive',
                } }),
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
});
exports.getAllJobOpening = getAllJobOpening;
//# sourceMappingURL=jobOpening.service.js.map