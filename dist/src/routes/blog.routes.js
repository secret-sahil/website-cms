"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_middleware_1 = require("../modules/validation/validate.middleware");
const auth_1 = require("../modules/auth");
const blog_1 = require("../modules/blog");
const router = express_1.default.Router();
router.get('/', auth_1.auth.deserializeUserIfAvaliable, auth_1.auth.requireUserIfAvaliable(['admin', 'content']), (0, validate_middleware_1.validate)(blog_1.blogSchema.getBlogSchema), blog_1.blogController.getBlogHandler);
router.get('/:id', auth_1.auth.deserializeUserIfAvaliable, auth_1.auth.requireUserIfAvaliable(['admin', 'content']), (0, validate_middleware_1.validate)(blog_1.blogSchema.getUniqueBlog), blog_1.blogController.getUniqueBlog);
router.post('/create', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'content']), (0, validate_middleware_1.validate)(blog_1.blogSchema.createBlogSchema), blog_1.blogController.createBlogHandler);
router.delete('/delete/:id', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'content']), (0, validate_middleware_1.validate)(blog_1.blogSchema.deleteBlogSchema), blog_1.blogController.deleteBlogHandler);
router.patch('/update/:id', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'content']), (0, validate_middleware_1.validate)(blog_1.blogSchema.updateBlogSchema), blog_1.blogController.updateBlogHandler);
exports.default = router;
//# sourceMappingURL=blog.routes.js.map