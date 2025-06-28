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
exports.getAllUsersAdminHandler = exports.updateUser = exports.getMeHandler = void 0;
const response_1 = require("../utils/response");
const _1 = require(".");
const connectRedis_1 = __importDefault(require("../utils/connectRedis"));
const getMeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        res.status(200).json((0, response_1.successResponse)('SUCCESS', 'User details fetched successfully', user));
    }
    catch (err) {
        next(err);
    }
});
exports.getMeHandler = getMeHandler;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const image = undefined;
        if (req.file) {
            req.file.originalname = `${user === null || user === void 0 ? void 0 : user.id}.${req.file.mimetype.split('/')[1]}`;
            // image = await awsS3services.uploadToS3(req.file!, 'avatar/');
            console.log(image);
        }
        const { firstName, lastName, role } = req.body;
        const updatedUserData = {
            firstName: firstName || (user === null || user === void 0 ? void 0 : user.firstName),
            lastName: lastName || (user === null || user === void 0 ? void 0 : user.lastName),
            role,
            photo: image ? image[0] : user === null || user === void 0 ? void 0 : user.photo,
        };
        yield _1.userServices.updateUser({ id: user === null || user === void 0 ? void 0 : user.id }, updatedUserData);
        const userCacheKey = `${user === null || user === void 0 ? void 0 : user.id}`;
        const userCacheData = yield connectRedis_1.default.get(userCacheKey);
        if (userCacheData) {
            const parsedUser = JSON.parse(userCacheData);
            const updatedUser = Object.assign(Object.assign({}, parsedUser), updatedUserData);
            connectRedis_1.default.set(userCacheKey, JSON.stringify(updatedUser), {
                EX: yield connectRedis_1.default.ttl(userCacheKey),
            });
        }
        res.status(200).json((0, response_1.successResponse)('SUCCESS', 'User updated successfully'));
    }
    catch (err) {
        next(err);
    }
});
exports.updateUser = updateUser;
const getAllUsersAdminHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield _1.userServices.getAllUsers(undefined, {
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
});
exports.getAllUsersAdminHandler = getAllUsersAdminHandler;
//# sourceMappingURL=user.controller.js.map