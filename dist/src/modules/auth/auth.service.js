"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTokens = exports.excludedFields = void 0;
const config_1 = __importDefault(require("config"));
const lodash_1 = require("lodash");
const connectRedis_1 = __importDefault(require("../utils/connectRedis"));
const jwt_1 = require("../utils/jwt");
exports.excludedFields = ['password', 'isBlocked', 'createdBy', 'updatedBy'];
const signTokens = async (user) => {
    // 1. Create Session
    connectRedis_1.default.set(`${user.id}`, JSON.stringify((0, lodash_1.omit)(user, exports.excludedFields)), {
        EX: config_1.default.get('redisCacheExpiresIn') * 24 * 60 * 60,
    });
    // 2. Create Access and Refresh tokens
    const access_token = (0, jwt_1.signJwt)({ sub: user.id }, 'accessTokenPrivateKey', {
        expiresIn: `${config_1.default.get('accessTokenExpiresIn')}d`,
    });
    const refresh_token = (0, jwt_1.signJwt)({ sub: user.id }, 'refreshTokenPrivateKey', {
        expiresIn: `${config_1.default.get('refreshTokenExpiresIn')}d`,
    });
    return { access_token, refresh_token };
};
exports.signTokens = signTokens;
//# sourceMappingURL=auth.service.js.map