"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithPasswordHandler = exports.changePasswordHandler = exports.logoutUserHandler = exports.refreshAccessTokenHandler = exports.registerUserHandler = void 0;
const config_1 = __importDefault(require("config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const appError_1 = __importDefault(require("../utils/appError"));
const connectRedis_1 = __importDefault(require("../utils/connectRedis"));
const jwt_1 = require("../utils/jwt");
const user_1 = require("../user");
const auth_service_1 = require("./auth.service");
const utils_1 = require("../utils");
const cookiesOptions = {
    httpOnly: true,
    sameSite: 'lax',
};
if (process.env.NODE_ENV === 'production')
    cookiesOptions.secure = true;
const accessTokenCookieOptions = {
    ...cookiesOptions,
    expires: new Date(Date.now() + config_1.default.get('accessTokenExpiresIn') * 24 * 60 * 60 * 1000),
    maxAge: config_1.default.get('accessTokenExpiresIn') * 24 * 60 * 60 * 1000,
};
const refreshTokenCookieOptions = {
    ...cookiesOptions,
    expires: new Date(Date.now() + config_1.default.get('refreshTokenExpiresIn') * 24 * 60 * 60 * 1000),
    maxAge: config_1.default.get('refreshTokenExpiresIn') * 24 * 60 * 60 * 1000,
};
const registerUserHandler = async (req, res, next) => {
    try {
        const user = req.user?.username;
        const { firstName, lastName, password, username, role } = req.body;
        const encryptedPasswrd = await bcryptjs_1.default.hash(password, 12);
        await user_1.userServices.createUser({
            username,
            firstName,
            lastName,
            role,
            password: encryptedPasswrd,
            createdBy: user,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'User Registred Successfully'));
    }
    catch (err) {
        next(err);
    }
};
exports.registerUserHandler = registerUserHandler;
const refreshAccessTokenHandler = async (req, res, next) => {
    try {
        let req_refresh_token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Refresh')) {
            req_refresh_token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies.refresh_token) {
            req_refresh_token = req.cookies.refresh_token;
        }
        const message = 'Could not refresh access token';
        if (!req_refresh_token) {
            return next(new appError_1.default(403, message));
        }
        // Validate refresh token
        const decoded = (0, jwt_1.verifyJwt)(req_refresh_token, 'refreshTokenPublicKey');
        if (!decoded) {
            return next(new appError_1.default(403, message));
        }
        // Check if user has a valid session
        const session = await connectRedis_1.default.get(`${decoded.sub}`);
        if (!session) {
            return next(new appError_1.default(403, message));
        }
        // Check if user still exist
        const user = await user_1.userServices.findUniqueUser({ id: JSON.parse(session).id });
        if (!user) {
            return next(new appError_1.default(403, message));
        }
        // Sign new access token
        const { access_token, refresh_token } = await (0, auth_service_1.signTokens)(user);
        res.cookie('access_token', access_token, accessTokenCookieOptions);
        res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
        res.cookie('logged_in', true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
        });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Token refreshed', {
            access_token: access_token,
            refresh_token: refresh_token,
            loggedIn: true,
        }));
    }
    catch (err) {
        next(err);
    }
};
exports.refreshAccessTokenHandler = refreshAccessTokenHandler;
function logout(res) {
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('refresh_token', '', { maxAge: 1 });
    res.cookie('logged_in', '', { maxAge: 1 });
}
const logoutUserHandler = async (req, res, next) => {
    try {
        if (req.user) {
            await connectRedis_1.default.del(`${req.user.id}`);
        }
        logout(res);
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Logged out successfully'));
    }
    catch (err) {
        next(err);
    }
};
exports.logoutUserHandler = logoutUserHandler;
const changePasswordHandler = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { password } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        await user_1.userServices.updateUser({ id }, { password: hashedPassword });
        res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Password changed successfully'));
    }
    catch (err) {
        next(err);
    }
};
exports.changePasswordHandler = changePasswordHandler;
const loginWithPasswordHandler = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await user_1.userServices.findUniqueUser({ username });
        if (!user) {
            return res
                .status(404)
                .json(utils_1.response.errorResponse('NOT_FOUND', 'User not found, please sign up.'));
        }
        if (await bcryptjs_1.default.compare(password, user.password)) {
            // Sign Tokens
            const { access_token, refresh_token } = await (0, auth_service_1.signTokens)(user);
            res.cookie('access_token', access_token, accessTokenCookieOptions);
            res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
            res.cookie('logged_in', true, {
                ...accessTokenCookieOptions,
                httpOnly: false,
            });
            res.status(200).json(utils_1.response.successResponse('SUCCESS', 'Logged in successfully', {
                access_token: access_token,
                refresh_token: refresh_token,
                loggedIn: true,
            }));
        }
        else {
            res.status(400).json(utils_1.response.errorResponse('FAIL', 'Wrong Password'));
        }
    }
    catch (err) {
        next(err);
    }
};
exports.loginWithPasswordHandler = loginWithPasswordHandler;
//# sourceMappingURL=auth.controller.js.map