"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationById = exports.getApplicationHandler = exports.updateApplicationHandler = exports.deleteApplicationHandler = void 0;
const utils_1 = require("../utils");
const _1 = require(".");
const appError_1 = __importDefault(require("../utils/appError"));
const deleteApplicationHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        await _1.applicationServices.deleteApplication({ id });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Application Deleted Successfully'));
    }
    catch (err) {
        if (err.code === 'P2003') {
            return next(new appError_1.default(400, "Can't delete data, it's used in other tables."));
        }
        next(err);
    }
};
exports.deleteApplicationHandler = deleteApplicationHandler;
const updateApplicationHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, isOpened } = req.body;
        await _1.applicationServices.updateApplication({
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
};
exports.updateApplicationHandler = updateApplicationHandler;
const getApplicationHandler = async (req, res, next) => {
    try {
        const { search, page, limit, jobOpeningId } = req.query;
        const application = await _1.applicationServices.getAllApplication(search, page ? Number(page) : undefined, limit ? Number(limit) : undefined, {
            jobOpeningId,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', application));
    }
    catch (err) {
        next(err);
    }
};
exports.getApplicationHandler = getApplicationHandler;
const getApplicationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const applications = await _1.applicationServices.getUniqueApplication({
            id,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', applications));
    }
    catch (err) {
        next(err);
    }
};
exports.getApplicationById = getApplicationById;
//# sourceMappingURL=application.controller.js.map