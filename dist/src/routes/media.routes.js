"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_middleware_1 = require("../modules/validation/validate.middleware");
const auth_1 = require("../modules/auth");
const media_1 = require("../modules/media");
const fileUpload_middleware_1 = require("../modules/upload/fileUpload.middleware");
const router = express_1.default.Router();
router.use(auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'content']));
router.get('/', (0, validate_middleware_1.validate)(media_1.mediaSchema.getMediaSchema), media_1.mediaController.getMediaHandler);
router.post('/upload', fileUpload_middleware_1.fileUpload.single('file'), (0, validate_middleware_1.validateFilePresence)(1, 1), media_1.mediaController.createMediaHandler);
router.delete('/delete/:id', (0, validate_middleware_1.validate)(media_1.mediaSchema.deleteMediaSchema), media_1.mediaController.deleteMediaHandler);
router.patch('/update/:id', fileUpload_middleware_1.fileUpload.single('file'), (0, validate_middleware_1.validateFilePresence)(1, 1), (0, validate_middleware_1.validate)(media_1.mediaSchema.updateMediaSchema), media_1.mediaController.updateMediaHandler);
exports.default = router;
//# sourceMappingURL=media.routes.js.map