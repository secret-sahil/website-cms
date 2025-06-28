"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_middleware_1 = require("../modules/validation/validate.middleware");
const auth_1 = require("../modules/auth");
const applications_1 = require("../modules/applications");
const router = express_1.default.Router();
router.get('/', auth_1.auth.deserializeUserIfAvaliable, auth_1.auth.requireUserIfAvaliable(['admin', 'hr']), (0, validate_middleware_1.validate)(applications_1.applicationSchema.getApplicationSchema), applications_1.applicationController.getApplicationHandler);
router.get('/:id', auth_1.auth.deserializeUserIfAvaliable, auth_1.auth.requireUserIfAvaliable(['admin', 'hr']), (0, validate_middleware_1.validate)(applications_1.applicationSchema.getApplicationByIdSchema), applications_1.applicationController.getApplicationById);
router.delete('/delete/:id', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'hr']), (0, validate_middleware_1.validate)(applications_1.applicationSchema.deleteApplicationSchema), applications_1.applicationController.deleteApplicationHandler);
router.patch('/update/:id', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'hr']), (0, validate_middleware_1.validate)(applications_1.applicationSchema.updateApplicationSchema), applications_1.applicationController.updateApplicationHandler);
exports.default = router;
//# sourceMappingURL=application.routes.js.map