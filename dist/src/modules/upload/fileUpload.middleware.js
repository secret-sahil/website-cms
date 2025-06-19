"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumeUpload = exports.fileUpload = exports.imageUpload = void 0;
const multer_1 = __importDefault(require("multer"));
exports.imageUpload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1000000,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg') {
            cb(null, true); // Accept the file
        }
        else {
            cb(new Error('Only .jpg, .png, or .jpeg format allowed!'));
        }
    },
});
exports.fileUpload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1000000,
    },
});
exports.resumeUpload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 2 * 1000000, //5 mb
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true); // Accept the file
        }
        else {
            cb(new Error('Only .pdf format allowed!'));
        }
    },
});
//# sourceMappingURL=fileUpload.middleware.js.map