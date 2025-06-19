"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_middleware_1 = require("../modules/validation/validate.middleware");
const auth_1 = require("../modules/auth");
const office_1 = require("../modules/office");
const router = express_1.default.Router();
router.get('/', auth_1.auth.deserializeUserIfAvaliable, auth_1.auth.requireUserIfAvaliable(['admin', 'content']), (0, validate_middleware_1.validate)(office_1.officeSchema.getOfficeSchema), office_1.officeController.getOfficeHandler);
router.get('/:id', auth_1.auth.deserializeUserIfAvaliable, auth_1.auth.requireUserIfAvaliable(['admin', 'content']), (0, validate_middleware_1.validate)(office_1.officeSchema.getUniqueOffice), office_1.officeController.getUniqueOffice);
router.post('/create', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'content']), (0, validate_middleware_1.validate)(office_1.officeSchema.createOfficeSchema), office_1.officeController.createOfficeHandler);
router.delete('/delete/:id', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'content']), (0, validate_middleware_1.validate)(office_1.officeSchema.deleteOfficeSchema), office_1.officeController.deleteOfficeHandler);
router.patch('/update/:id', auth_1.auth.deserializeUser, auth_1.auth.requireUser(['admin', 'content']), (0, validate_middleware_1.validate)(office_1.officeSchema.updateOfficeSchema), office_1.officeController.updateOfficeHandler);
exports.default = router;
//# sourceMappingURL=office.routes.js.map