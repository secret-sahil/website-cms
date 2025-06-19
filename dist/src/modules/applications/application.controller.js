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
exports.getApplicationById = exports.getApplicationHandler = exports.updateApplicationHandler = exports.deleteApplicationHandler = void 0;
const utils_1 = require("../utils");
const _1 = require(".");
const appError_1 = __importDefault(require("../utils/appError"));
const deleteApplicationHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield _1.applicationServices.deleteApplication({ id });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Application Deleted Successfully'));
    }
    catch (err) {
        if (err.code === 'P2003') {
            return next(new appError_1.default(400, "Can't delete data, it's used in other tables."));
        }
        next(err);
    }
});
exports.deleteApplicationHandler = deleteApplicationHandler;
const updateApplicationHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status, isOpened } = req.body;
        yield _1.applicationServices.updateApplication({
            id,
        }, {
            status,
            isOpened,
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
exports.updateApplicationHandler = updateApplicationHandler;
const getApplicationHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, page, limit, jobOpeningId } = req.query;
        const application = yield _1.applicationServices.getAllApplication(search, page ? Number(page) : undefined, limit ? Number(limit) : undefined, {
            jobOpeningId,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', application));
    }
    catch (err) {
        next(err);
    }
});
exports.getApplicationHandler = getApplicationHandler;
const getApplicationById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const applications = yield _1.applicationServices.getUniqueApplication({
            id,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', applications));
    }
    catch (err) {
        next(err);
    }
});
exports.getApplicationById = getApplicationById;
//# sourceMappingURL=application.controller.js.map