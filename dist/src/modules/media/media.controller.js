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
exports.getMediaHandler = exports.updateMediaHandler = exports.deleteMediaHandler = exports.createMediaHandler = void 0;
const utils_1 = require("../utils");
const _1 = require(".");
const appError_1 = __importDefault(require("../utils/appError"));
const upload_1 = require("../upload");
const functions_1 = require("../utils/functions");
const createMediaHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return next(new appError_1.default(400, 'Media file is required.'));
    }
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const newFilename = req.file.originalname.includes('.')
        ? req.file.originalname.replace(/(\.[^.]*)$/, `-${randomSuffix}$1`)
        : req.file.originalname + `-${randomSuffix}`;
    req.file.originalname = newFilename;
    try {
        const image = yield upload_1.awsS3services.uploadToS3(req.file, 'media-infutrix/');
        yield _1.mediaServices.createMedia({
            url: image[0],
            name: newFilename,
            type: (0, functions_1.getMediaType)(req.file.mimetype),
            createdBy: req.user.username,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Created Successfully', {
            image: image[0],
            name: newFilename,
        }));
    }
    catch (err) {
        yield upload_1.awsS3services.deleteFromS3(`media-infutrix/${newFilename}`);
        next(err);
    }
});
exports.createMediaHandler = createMediaHandler;
const deleteMediaHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const media = yield _1.mediaServices.getUniqueMedia({ id });
        yield _1.mediaServices.deleteMedia({ id });
        yield upload_1.awsS3services.deleteFromS3(`media-infutrix/${media.name}`);
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Media Deleted Successfully'));
    }
    catch (err) {
        if (err.code === 'P2003') {
            return next(new appError_1.default(400, "Can't delete data, it's used in other tables."));
        }
        next(err);
    }
});
exports.deleteMediaHandler = deleteMediaHandler;
const updateMediaHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return next(new appError_1.default(400, 'Media file is required.'));
    }
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const newFilename = req.file.originalname.includes('.')
        ? req.file.originalname.replace(/(\.[^.]*)$/, `-${randomSuffix}$1`)
        : req.file.originalname + `-${randomSuffix}`;
    req.file.originalname = newFilename;
    try {
        const { id } = req.params;
        const image = yield upload_1.awsS3services.uploadToS3(req.file, 'media-infutrix/');
        yield _1.mediaServices.updateMedia({
            id,
        }, {
            url: image[0],
            type: (0, functions_1.getMediaType)(req.file.mimetype),
            name: newFilename,
            updatedBy: req.user.username,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Updated Successfully', {
            image: image[0],
            name: newFilename,
        }));
    }
    catch (err) {
        yield upload_1.awsS3services.deleteFromS3(`media-infutrix/${newFilename}`);
        if (err.code === 'P2002') {
            return next(new appError_1.default(400, 'Duplicate entries are not allowed.'));
        }
        next(err);
    }
});
exports.updateMediaHandler = updateMediaHandler;
const getMediaHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, type: rawType } = req.query;
        const type = rawType ? JSON.parse(rawType) : undefined;
        const media = yield _1.mediaServices.getAllMedia(page ? Number(page) : undefined, limit ? Number(limit) : undefined, Object.assign({}, (type ? { type: { in: type } } : {})), {
            blogs: {
                select: {
                    id: true,
                    title: true,
                },
            },
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Fetched successfully', media));
    }
    catch (err) {
        next(err);
    }
});
exports.getMediaHandler = getMediaHandler;
//# sourceMappingURL=media.controller.js.map