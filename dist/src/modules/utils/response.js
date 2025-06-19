"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const currentDateTime = () => {
    const date = new Date();
    const currentDataTime = date.toLocaleString([], { hour12: true });
    return currentDataTime;
};
/**
 * Function to provide a standardized success response for all APIs.
 * @param resultCode - API response defined custom result_code.
 * @param title - API response title based on result_code.
 * @param message - API response your defined message.
 * @param data - Any kind of data in API response.
 * @param maintenance - Optional: Provide any kind of maintenance information.
 * @returns A standardized success response.
 */
const successResponse = (title, message, data, maintenance) => ({
    success: true,
    time: currentDateTime(),
    maintenance_info: maintenance || null,
    result: {
        title,
        message,
        data: data ? data : undefined,
    },
});
exports.successResponse = successResponse;
/**
 * Function to provide a standardized error response for all APIs.
 * @param resultCode - API response defined custom result_code.
 * @param title - API response title based on result_code.
 * @param error - Any kind of error in API response.
 * @param maintenance - Optional: Provide any kind of maintenance information.
 * @returns A standardized error response.
 */
const errorResponse = (title, error, maintenance) => ({
    success: false,
    time: currentDateTime(),
    maintenance_info: maintenance || null,
    result: {
        title,
        error,
    },
});
exports.errorResponse = errorResponse;
//# sourceMappingURL=response.js.map