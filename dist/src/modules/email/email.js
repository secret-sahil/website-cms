"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Email_to, _Email_from, _Email_replyTo, _Email_context;
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("config"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const handlebars_1 = __importDefault(require("handlebars"));
const juice_1 = __importDefault(require("juice"));
const smtp = config_1.default.get('smtp');
const appName = config_1.default.get('appName');
class Email {
    constructor(user) {
        this.user = user;
        _Email_to.set(this, void 0);
        _Email_from.set(this, void 0);
        _Email_replyTo.set(this, void 0);
        _Email_context.set(this, void 0);
        __classPrivateFieldSet(this, _Email_context, user.context, "f");
        __classPrivateFieldSet(this, _Email_to, user.email, "f");
        __classPrivateFieldSet(this, _Email_from, `${appName} <${smtp.user}>`, "f");
        __classPrivateFieldSet(this, _Email_replyTo, `${appName} <${smtp.user}>`, "f");
    }
    newTransport() {
        return nodemailer_1.default.createTransport(Object.assign(Object.assign({}, smtp), { auth: {
                user: smtp.user,
                pass: smtp.pass,
            } }));
    }
    send(_a) {
        return __awaiter(this, arguments, void 0, function* ({ template, subject }) {
            try {
                const templatePath = path_1.default.join(`${__dirname}/../../views/${template}.hbs`);
                const rawHtml = yield promises_1.default.readFile(templatePath, 'utf8');
                const compiledTemplate = handlebars_1.default.compile(rawHtml);
                const htmlWithData = compiledTemplate(__classPrivateFieldGet(this, _Email_context, "f"));
                const html = (0, juice_1.default)(htmlWithData);
                const mailOptions = {
                    from: __classPrivateFieldGet(this, _Email_from, "f"),
                    replyTo: __classPrivateFieldGet(this, _Email_replyTo, "f"),
                    to: __classPrivateFieldGet(this, _Email_to, "f"),
                    subject,
                    html,
                };
                yield this.newTransport().sendMail(mailOptions);
            }
            catch (error) {
                console.error('Error during send mail :', error);
            }
        });
    }
    sendLeadFormResponseMail() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send({
                template: 'leadFormResponse',
                subject: 'Thank You for Reaching Out to Infutrix!',
            });
        });
    }
    sendjobApplicationMail() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send({
                template: 'jobApplicationSubmit',
                subject: 'Application Received – Thanks for Applying at Infutrix!',
            });
        });
    }
}
_Email_to = new WeakMap(), _Email_from = new WeakMap(), _Email_replyTo = new WeakMap(), _Email_context = new WeakMap();
exports.default = Email;
//# sourceMappingURL=email.js.map