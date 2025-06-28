"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_middleware_1 = require("../modules/validation/validate.middleware");
const auth_1 = require("../modules/auth");
const lead_1 = require("../modules/lead");
const router = express_1.default.Router();
router.get('/', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'sales']), (0, validate_middleware_1.validate)(lead_1.leadSchema.getLeadSchema), lead_1.leadController.getLeadHandler);
router.get('/:id', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'sales']), (0, validate_middleware_1.validate)(lead_1.leadSchema.getUniqueLead), lead_1.leadController.getUniqueLead);
router.post('/create', (0, validate_middleware_1.validate)(lead_1.leadSchema.createLeadSchema), lead_1.leadController.createLeadHandler);
router.patch('/update/:id', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'sales']), (0, validate_middleware_1.validate)(lead_1.leadSchema.updateLeadSchema), lead_1.leadController.updateLeadHandler);
exports.default = router;
//# sourceMappingURL=lead.routes.js.map