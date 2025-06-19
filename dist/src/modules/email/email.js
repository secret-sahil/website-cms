"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
    user;
    #to;
    #from;
    #replyTo;
    #context;
    constructor(user) {
        this.user = user;
        this.#context = user.context;
        this.#to = user.email;
        this.#from = `${appName} <${smtp.user}>`;
        this.#replyTo = `${appName} <${smtp.user}>`;
    }
    newTransport() {
        return nodemailer_1.default.createTransport({
            ...smtp,
            auth: {
                user: smtp.user,
                pass: smtp.pass,
            },
        });
    }
    async send({ template, subject }) {
        try {
            const templatePath = path_1.default.join(`${__dirname}/../../views/${template}.hbs`);
            const rawHtml = await promises_1.default.readFile(templatePath, 'utf8');
            const compiledTemplate = handlebars_1.default.compile(rawHtml);
            const htmlWithData = compiledTemplate(this.#context);
            const html = (0, juice_1.default)(htmlWithData);
            const mailOptions = {
                from: this.#from,
                replyTo: this.#replyTo,
                to: this.#to,
                subject,
                html,
            };
            await this.newTransport().sendMail(mailOptions);
        }
        catch (error) {
            console.error('Error during send mail :', error);
        }
    }
    async sendLeadFormResponseMail() {
        await this.send({
            template: 'leadFormResponse',
            subject: 'Thank You for Reaching Out to Infutrix!',
        });
    }
    async sendjobApplicationMail() {
        await this.send({
            template: 'jobApplicationSubmit',
            subject: 'Application Received – Thanks for Applying at Infutrix!',
        });
    }
}
exports.default = Email;
//# sourceMappingURL=email.js.map