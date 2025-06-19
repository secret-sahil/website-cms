"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundRoute = void 0;
const response_1 = require("./response");
const client_1 = require("@prisma/client");
const prisma_better_errors_1 = require("prisma-better-errors");
class AppError extends Error {
    statusCode;
    message;
    status;
    isOperational;
    constructor(statusCode = 500, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.status = `${statusCode}`.startsWith('4') ? 'FAIL' : 'ERROR';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
/**
 * 404 - Not Found Error Handler
 * @param _req - Express request object (not used).
 * @param res - Express response object.
 * @param _next - Express next function (not used).
 */
const notFoundRoute = (_req, res) => {
    res.status(404).json((0, response_1.errorResponse)('UNKNOWN ACCESS', 'Sorry! Your requested URL was not found.'));
};
exports.notFoundRoute = notFoundRoute;
/**
 * 500 - Internal Server Error Handler
 * @param err - Error object.
 * @param _req - Express request object (not used).
 * @param res - Express response object.
 * @param next - Express next function.
 */
const errorHandler = (err, _req, res, next) => {
    // console.error(err); // Log the error for debugging
    if (res.headersSent) {
        return next(new Error('Something went wrong. App server error.'));
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        res
            .status(err.statusCode || 500)
            .json((0, response_1.errorResponse)(err.status || 'SERVER SIDE ERROR', new prisma_better_errors_1.prismaError(err).message || 'Something went wrong. There was an error.'));
    }
    else {
        res
            .status(err.statusCode || 500)
            .json((0, response_1.errorResponse)(err.status || 'SERVER SIDE ERROR', err.message || 'Something went wrong. There was an error.'));
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=appError.js.map