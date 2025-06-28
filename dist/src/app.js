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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const path_1 = __importDefault(require("path"));
const validateEnv_1 = __importDefault(require("./modules/utils/validateEnv"));
const client_1 = require("@prisma/client");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const blog_routes_1 = __importDefault(require("./routes/blog.routes"));
const office_routes_1 = __importDefault(require("./routes/office.routes"));
const application_routes_1 = __importDefault(require("./routes/application.routes"));
const lead_routes_1 = __importDefault(require("./routes/lead.routes"));
const jobOpening_routes_1 = __importDefault(require("./routes/jobOpening.routes"));
const media_routes_1 = __importDefault(require("./routes/media.routes"));
const appError_1 = require("./modules/utils/appError");
const default_1 = require("./modules/default");
// import nodemailer from 'nodemailer';
// (async function () {
//   const credentials = await nodemailer.createTestAccount();
//   console.log(credentials);
// })();
(0, validateEnv_1.default)();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // TEMPLATE ENGINE
        app.set('view engine', 'hbs');
        app.set('views', `${__dirname}/views`);
        app.use((0, serve_favicon_1.default)(path_1.default.join(__dirname, '..', 'public', 'favicon.ico')));
        // MIDDLEWARE
        // 1.Body Parser
        app.use(express_1.default.json({ limit: '10mb' }));
        // 2. Security
        app.use((0, helmet_1.default)());
        // 3. Cookie Parser
        app.use((0, cookie_parser_1.default)());
        // 4. Cors
        app.use((0, cors_1.default)({
            origin: config_1.default.get('origin'),
            credentials: true,
        }));
        // 5. Logger
        if (config_1.default.get('env') === 'development')
            app.use((0, morgan_1.default)('dev'));
        // ROUTES
        app.get('/', default_1.defaultController.defaultController);
        app.use('/api/v1/auth', auth_routes_1.default);
        app.use('/api/v1/users', user_routes_1.default);
        app.use('/api/v1/categories', category_routes_1.default);
        app.use('/api/v1/careers', jobOpening_routes_1.default);
        app.use('/api/v1/blog', blog_routes_1.default);
        app.use('/api/v1/office', office_routes_1.default);
        app.use('/api/v1/applications', application_routes_1.default);
        app.use('/api/v1/lead', lead_routes_1.default);
        app.use('/api/v1/media', media_routes_1.default);
        app.get('/test-template', (req, res) => {
            res.render('leadFormResponse');
        });
        // 404 ~ not found error handler
        app.use(appError_1.notFoundRoute);
        // GLOBAL ERROR HANDLER
        app.use(appError_1.errorHandler);
        const port = config_1.default.get('port');
        app.listen(port, () => {
            console.log(`Server on port: ${port}`);
        });
    });
}
main()
    .catch((err) => {
    throw err;
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
//# sourceMappingURL=app.js.map