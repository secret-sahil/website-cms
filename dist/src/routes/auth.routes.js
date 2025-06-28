"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_middleware_1 = require("../modules/validation/validate.middleware");
const auth_1 = require("../modules/auth");
const fileUpload_middleware_1 = require("../modules/upload/fileUpload.middleware");
const router = express_1.default.Router();
router.post('/register', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin']), fileUpload_middleware_1.imageUpload.single('photo'), (0, validate_middleware_1.validate)(auth_1.authSchema.registerUserSchema), auth_1.authController.registerUserHandler);
router.post('/change-password', auth_1.auth.deserializeUser, (0, validate_middleware_1.validate)(auth_1.authSchema.changePasswordSchema), auth_1.authController.changePasswordHandler);
router.post('/login', (0, validate_middleware_1.validate)(auth_1.authSchema.loginWithPasswordSchema), auth_1.authController.loginWithPasswordHandler);
router.post('/refresh', auth_1.authController.refreshAccessTokenHandler);
router.post('/logout', auth_1.authController.logoutUserHandler);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map