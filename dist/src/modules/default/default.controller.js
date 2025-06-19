"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultController = void 0;
const config_1 = __importDefault(require("config"));
const utils_1 = require("../utils");
/**
 * Default controller to handle the root route.
 * @param _req - Express request object (not used).
 * @param res - Express response object.
 */
const defaultController = (_req, res) => {
    try {
        res
            .status(200)
            .json(utils_1.response.successResponse('SUCCESS', `Welcome to ${config_1.default.get('appName')} Backend`));
    }
    catch (error) {
        res
            .status(500)
            .json(utils_1.response.errorResponse('SERVER SIDE ERROR', error instanceof Error ? error.message : 'Unknown error occurred.'));
    }
};
exports.defaultController = defaultController;
//# sourceMappingURL=default.controller.js.map