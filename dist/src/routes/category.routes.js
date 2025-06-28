"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_middleware_1 = require("../modules/validation/validate.middleware");
const auth_1 = require("../modules/auth");
const category_1 = require("../modules/category");
const router = express_1.default.Router();
router.get('/', auth_1.auth.deserializeUserIfAvaliable, auth_1.auth.requireUserIfAvaliable(['admin', 'content']), (0, validate_middleware_1.validate)(category_1.categorySchema.getCategorySchema), category_1.categoryController.getCategoryHandler);
router.get('/:id', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'content']), (0, validate_middleware_1.validate)(category_1.categorySchema.getCategoryByIdSchema), category_1.categoryController.getCategoryById);
router.post('/create', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'content']), (0, validate_middleware_1.validate)(category_1.categorySchema.createCategorySchema), category_1.categoryController.createCategoryHandler);
router.delete('/delete/:id', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'content']), (0, validate_middleware_1.validate)(category_1.categorySchema.deleteCategorySchema), category_1.categoryController.deleteCategoryHandler);
router.patch('/update/:id', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'content']), (0, validate_middleware_1.validate)(category_1.categorySchema.updateCategorySchema), category_1.categoryController.updateCategoryHandler);
exports.default = router;
//# sourceMappingURL=category.routes.js.map