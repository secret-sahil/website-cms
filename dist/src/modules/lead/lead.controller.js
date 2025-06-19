"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueLead = exports.getLeadHandler = exports.updateLeadHandler = exports.createLeadHandler = void 0;
const utils_1 = require("../utils");
const _1 = require(".");
const appError_1 = __importDefault(require("../utils/appError"));
const email_1 = __importDefault(require("../email/email"));
const functions_1 = require("../utils/functions");
const createLeadHandler = async (req, res, next) => {
    try {
        const { fullName, email, phone, jobTitle, companySize, company, message, budget, source } = req.body;
        await _1.leadServices.createLead({
            fullName,
            email: (0, functions_1.encryptData)(email),
            phone: (0, functions_1.encryptData)(phone),
            jobTitle,
            company: (0, functions_1.encryptData)(company),
            companySize,
            message: (0, functions_1.encryptData)(message),
            budget,
            source,
        });
        new email_1.default({ email, context: { fullName } }).sendLeadFormResponseMail();
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Created Successfully'));
    }
    catch (err) {
        if (err.code === 'P2002') {
            return next(new appError_1.default(400, 'Duplicate entries are not allowed.'));
        }
        next(err);
    }
};
exports.createLeadHandler = createLeadHandler;
const updateLeadHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { isOpened } = req.body;
        await _1.leadServices.updateLead({
            id,
        }, {
            isOpened: isOpened ? isOpened : undefined,
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
exports.updateLeadHandler = updateLeadHandler;
const getLeadHandler = async (req, res, next) => {
    try {
        const { search, page, limit } = req.query;
        const lead = await _1.leadServices.getAllLead(search, page ? Number(page) : undefined, limit ? Number(limit) : undefined);
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', lead));
    }
    catch (err) {
        next(err);
    }
};
exports.getLeadHandler = getLeadHandler;
const getUniqueLead = async (req, res, next) => {
    try {
        const { id } = req.params;
        const leads = await _1.leadServices.getUniqueLead({
            id: id,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', leads));
    }
    catch (err) {
        next(err);
    }
};
exports.getUniqueLead = getUniqueLead;
//# sourceMappingURL=lead.controller.js.map