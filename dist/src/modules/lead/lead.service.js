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
exports.getAllLead = exports.getUniqueLead = exports.updateLead = exports.deleteLead = exports.createLead = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createLead = (input, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.lead.create({
        data: input,
        select,
    }));
});
exports.createLead = createLead;
const deleteLead = (where) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.lead.delete({
        where: Object.assign({}, where),
    }));
});
exports.deleteLead = deleteLead;
const updateLead = (where, data, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.lead.update({
        data,
        where: Object.assign({}, where),
        select,
    }));
});
exports.updateLead = updateLead;
const getUniqueLead = (where, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.lead.findUnique({
        where: Object.assign({}, where),
        select,
    }));
});
exports.getUniqueLead = getUniqueLead;
const getAllLead = (search_1, ...args_1) => __awaiter(void 0, [search_1, ...args_1], void 0, function* (search, page = 1, pageSize, where, select, orderBy = 'desc') {
    const skip = pageSize ? (page - 1) * pageSize : 0;
    const [data, total] = yield Promise.all([
        prisma.lead.findMany({
            where: Object.assign(Object.assign({}, where), { email: {
                    contains: search,
                    mode: 'insensitive', // Optional: case-insensitive search
                } }),
            skip,
            take: pageSize,
            select,
            orderBy: {
                createdAt: orderBy,
            },
        }),
        prisma.lead.count({
            where: Object.assign(Object.assign({}, where), { email: {
                    contains: search,
                    mode: 'insensitive', // Ensure the count query matches the findMany query
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
exports.getAllLead = getAllLead;
//# sourceMappingURL=lead.service.js.map