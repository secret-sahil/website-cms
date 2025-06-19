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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueOffice = exports.getOfficeHandler = exports.updateOfficeHandler = exports.deleteOfficeHandler = exports.createOfficeHandler = void 0;
const utils_1 = require("../utils");
const _1 = require(".");
const appError_1 = __importDefault(require("../utils/appError"));
const createOfficeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, address, city, state, country, postalCode } = req.body;
        yield _1.officeServices.createOffice({
            name,
            address,
            city,
            state,
            country,
            postalCode,
            createdBy: req.user.username,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Created Successfully'));
    }
    catch (err) {
        if (err.code === 'P2002') {
            return next(new appError_1.default(400, 'Duplicate entries are not allowed.'));
        }
        next(err);
    }
});
exports.createOfficeHandler = createOfficeHandler;
const deleteOfficeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield _1.officeServices.deleteOffice({ id });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Office Deleted Successfully'));
    }
    catch (err) {
        if (err.code === 'P2003') {
            return next(new appError_1.default(400, "Can't delete data, it's used in other tables."));
        }
        next(err);
    }
});
exports.deleteOfficeHandler = deleteOfficeHandler;
const updateOfficeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, address, city, state, country, postalCode } = req.body;
        yield _1.officeServices.updateOffice({
            id,
        }, {
            name,
            address,
            city,
            state,
            country,
            postalCode,
            updatedBy: req.user.username,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Updated Successfully'));
    }
    catch (err) {
        if (err.code === 'P2002') {
            return next(new appError_1.default(400, 'Duplicate entries are not allowed.'));
        }
        next(err);
    }
});
exports.updateOfficeHandler = updateOfficeHandler;
const getOfficeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, page, limit } = req.query;
        const office = yield _1.officeServices.getAllOffice(search, page ? Number(page) : undefined, limit ? Number(limit) : undefined);
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', office));
    }
    catch (err) {
        next(err);
    }
});
exports.getOfficeHandler = getOfficeHandler;
const getUniqueOffice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const offices = yield _1.officeServices.getUniqueOffice({
            id,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', offices));
    }
    catch (err) {
        next(err);
    }
});
exports.getUniqueOffice = getUniqueOffice;
//# sourceMappingURL=office.controller.js.map