"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = exports.validateFilePresence = exports.validate = void 0;
const zod_1 = require("zod");
const appError_1 = __importDefault(require("../utils/appError"));
const utils_1 = require("../utils");
const validate = (schema) => (req, res, next) => {
    try {
        const parsed = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        req.body = parsed.body;
        req.query = parsed.query;
        req.params = parsed.params;
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json(utils_1.response.errorResponse('FAIL', error.errors));
        }
        next(error);
    }
};
exports.validate = validate;
const validateFilePresence = (minFiles, maxFiles) => {
    return (req, res, next) => {
        let fileCount = 0;
        if (req.file) {
            fileCount = 1;
        }
        else if (req.files) {
            fileCount = req.files.length;
        }
        if (fileCount < minFiles) {
            return next(new appError_1.default(400, `At least ${minFiles} file(s) must be uploaded.`));
        }
        if (fileCount > maxFiles) {
            return next(new appError_1.default(400, `A maximum of ${maxFiles} file(s) can be uploaded.`));
        }
        next();
    };
};
exports.validateFilePresence = validateFilePresence;
const requireUser = (roles) => (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return next(new appError_1.default(400, `Session has expired or user doesn't exist`));
        }
        if (roles.includes(user.role)) {
            return next();
        }
        else {
            return next(new appError_1.default(401, `Unauthorized Access`));
        }
    }
    catch (err) {
        next(err);
    }
};
exports.requireUser = requireUser;
//# sourceMappingURL=validate.middleware.js.map