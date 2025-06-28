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
exports.requireUserIfAvaliable = exports.requireUser = exports.deserializeUserIfAvaliable = exports.deserializeUser = void 0;
// import { omit } from 'lodash';
// import { excludedFields, findUniqueUser } from '../services/user.service';
const appError_1 = __importDefault(require("../utils/appError"));
const connectRedis_1 = __importDefault(require("../utils/connectRedis"));
const jwt_1 = require("../utils/jwt");
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let access_token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }
        if (!access_token) {
            return next(new appError_1.default(401, 'You are not logged in'));
        }
        // Validate the access token
        const decoded = (0, jwt_1.verifyJwt)(access_token, 'accessTokenPublicKey');
        if (!decoded) {
            return next(new appError_1.default(401, `Invalid token or user doesn't exist`));
        }
        // Check if the user has a valid session
        const session = yield connectRedis_1.default.get(`${decoded.sub}`);
        if (!session) {
            return next(new appError_1.default(401, `Invalid token or session has expired`));
        }
        // Check if the user still exist
        // const user = await findUniqueUser({ id: JSON.parse(session).id });
        // if (!user) {
        //   return next(new AppError(401, `Invalid token or session has expired`));
        // }
        // Add user to res
        req.user = JSON.parse(session); //omit(user, excludedFields);
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.deserializeUser = deserializeUser;
const deserializeUserIfAvaliable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let access_token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }
        if (!access_token) {
            return next();
        }
        // Validate the access token
        const decoded = (0, jwt_1.verifyJwt)(access_token, 'accessTokenPublicKey');
        if (!decoded) {
            return next();
        }
        // Check if the user has a valid session
        const session = yield connectRedis_1.default.get(decoded.sub);
        if (!session) {
            return next();
        }
        // Check if the user still exist
        // const user = await findUniqueUser({ id: JSON.parse(session).id });
        // if (!user) {
        //   return next(new AppError(401, `Invalid token or session has expired`));
        // }
        // Add user to res
        req.user = JSON.parse(session); //omit(user, excludedFields);
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.deserializeUserIfAvaliable = deserializeUserIfAvaliable;
const requireUser = (roles) => (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return next(new appError_1.default(400, `Session has expired or user doesn't exist`));
        }
        if (roles.includes(user.role)) {
            req.hasAccess = true;
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
const requireUserIfAvaliable = (roles) => (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return next();
        }
        if (roles.includes(user.role)) {
            req.hasAccess = true;
            return next();
        }
        else {
            return next();
        }
    }
    catch (err) {
        next(err);
    }
};
exports.requireUserIfAvaliable = requireUserIfAvaliable;
//# sourceMappingURL=auth.middleware.js.map