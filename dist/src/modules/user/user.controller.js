"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersAdminHandler = exports.updateUser = exports.getMeHandler = void 0;
const response_1 = require("../utils/response");
const _1 = require(".");
const connectRedis_1 = __importDefault(require("../utils/connectRedis"));
const getMeHandler = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json((0, response_1.successResponse)('SUCCESS', 'User details fetched successfully', user));
    }
    catch (err) {
        next(err);
    }
};
exports.getMeHandler = getMeHandler;
const updateUser = async (req, res, next) => {
    try {
        const user = req.user;
        const image = undefined;
        if (req.file) {
            req.file.originalname = `${user?.id}.${req.file.mimetype.split('/')[1]}`;
            // image = await awsS3services.uploadToS3(req.file!, 'avatar/');
            console.log(image);
        }
        const { firstName, lastName, role } = req.body;
        const updatedUserData = {
            firstName: firstName || user?.firstName,
            lastName: lastName || user?.lastName,
            role,
            photo: image ? image[0] : user?.photo,
        };
        await _1.userServices.updateUser({ id: user?.id }, updatedUserData);
        const userCacheKey = `${user?.id}`;
        const userCacheData = await connectRedis_1.default.get(userCacheKey);
        if (userCacheData) {
            const parsedUser = JSON.parse(userCacheData);
            const updatedUser = {
                ...parsedUser,
                ...updatedUserData,
            };
            connectRedis_1.default.set(userCacheKey, JSON.stringify(updatedUser), {
                EX: await connectRedis_1.default.ttl(userCacheKey),
            });
        }
        res.status(200).json((0, response_1.successResponse)('SUCCESS', 'User updated successfully'));
    }
    catch (err) {
        next(err);
    }
};
exports.updateUser = updateUser;
const getAllUsersAdminHandler = async (req, res, next) => {
    try {
        const users = await _1.userServices.getAllUsers(undefined, {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            password: false,
            photo: true,
            isBlocked: true,
            createdAt: true,
            updatedAt: true,
        });
        res.status(200).json((0, response_1.successResponse)('SUCCESS', 'Users fetched successfully', users));
    }
    catch (err) {
        next(err);
    }
};
exports.getAllUsersAdminHandler = getAllUsersAdminHandler;
//# sourceMappingURL=user.controller.js.map