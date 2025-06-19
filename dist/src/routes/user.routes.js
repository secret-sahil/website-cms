"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../modules/auth");
const user_1 = require("../modules/user");
const validate_middleware_1 = require("../modules/validation/validate.middleware");
const fileUpload_middleware_1 = require("../modules/upload/fileUpload.middleware");
const router = express_1.default.Router();
router.get('/me', auth_1.auth.deserializeUser, user_1.userController.getMeHandler);
router.patch('/update-user', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin']), fileUpload_middleware_1.imageUpload.single('photo'), (0, validate_middleware_1.validate)(user_1.userSchema.updateUserSchema), user_1.userController.updateUser);
// admin routes
router.get('/', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin']), user_1.userController.getAllUsersAdminHandler);
exports.default = router;
//# sourceMappingURL=user.routes.js.map