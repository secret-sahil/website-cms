"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_middleware_1 = require("../modules/validation/validate.middleware");
const auth_1 = require("../modules/auth");
const jobOpening_1 = require("../modules/jobOpening");
const fileUpload_middleware_1 = require("../modules/upload/fileUpload.middleware");
const router = express_1.default.Router();
router.get('/', auth_1.auth.deserializeUserIfAvaliable, auth_1.auth.requireUserIfAvaliable(['admin', 'hr']), (0, validate_middleware_1.validate)(jobOpening_1.jobOpeningSchema.getJobOpeningSchema), jobOpening_1.jobOpeningController.getJobOpeningHandler);
router.get('/:id', auth_1.auth.deserializeUserIfAvaliable, auth_1.auth.requireUserIfAvaliable(['admin', 'hr']), (0, validate_middleware_1.validate)(jobOpening_1.jobOpeningSchema.getJobOpeningByIdSchema), jobOpening_1.jobOpeningController.getJobOpeningById);
router.post('/create', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'hr']), (0, validate_middleware_1.validate)(jobOpening_1.jobOpeningSchema.createJobOpeningSchema), jobOpening_1.jobOpeningController.createJobOpeningHandler);
router.post('/apply', fileUpload_middleware_1.resumeUpload.single('resume'), (0, validate_middleware_1.validateFilePresence)(1, 1), (0, validate_middleware_1.validate)(jobOpening_1.jobOpeningSchema.applyJobOpeningSchema), jobOpening_1.jobOpeningController.applyJobOpeningHandler);
router.delete('/delete/:id', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'hr']), (0, validate_middleware_1.validate)(jobOpening_1.jobOpeningSchema.deleteJobOpeningSchema), jobOpening_1.jobOpeningController.deleteJobOpeningHandler);
router.patch('/update/:id', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'hr']), (0, validate_middleware_1.validate)(jobOpening_1.jobOpeningSchema.updateJobOpeningSchema), jobOpening_1.jobOpeningController.updateJobOpeningHandler);
exports.default = router;
//# sourceMappingURL=jobOpening.routes.js.map