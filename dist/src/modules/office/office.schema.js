"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOfficeSchema = exports.getUniqueOffice = exports.deleteOfficeSchema = exports.updateOfficeSchema = exports.createOfficeSchema = void 0;
const zod_1 = require("zod");
exports.createOfficeSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'Name is required.' })
            .min(3, { message: 'Name is too short.' })
            .max(30, { message: 'Name is too long.' })
            .trim(),
        address: (0, zod_1.string)({ required_error: 'Address is required.' }).trim(),
        city: (0, zod_1.string)({ required_error: 'City is required.' }).trim(),
        state: (0, zod_1.string)({ required_error: 'State is required.' }).trim(),
        country: (0, zod_1.string)({ required_error: 'Country is required.' }).trim(),
        postalCode: (0, zod_1.string)({ required_error: 'Postal Code is required.' }).trim(),
    }),
});
exports.updateOfficeSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }),
    }),
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'Name is required.' })
            .min(3, { message: 'Name is too short.' })
            .max(30, { message: 'Name is too long.' })
            .trim(),
        address: (0, zod_1.string)({ required_error: 'Address is required.' }).trim(),
        city: (0, zod_1.string)({ required_error: 'City is required.' }).trim(),
        state: (0, zod_1.string)({ required_error: 'State is required.' }).trim(),
        country: (0, zod_1.string)({ required_error: 'Country is required.' }).trim(),
        postalCode: (0, zod_1.string)({ required_error: 'Postal Code is required.' }).trim(),
    }).partial(),
});
exports.deleteOfficeSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }),
    }),
});
exports.getUniqueOffice = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Id is required.' }),
    }),
});
exports.getOfficeSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        search: (0, zod_1.string)(),
        page: (0, zod_1.string)(),
        limit: (0, zod_1.string)(),
    }).partial(),
});
//# sourceMappingURL=office.schema.js.map