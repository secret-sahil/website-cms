"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
function validateEnv() {
    (0, envalid_1.cleanEnv)(process.env, {
        DATABASE_URL: (0, envalid_1.str)(),
        REDIS_URL: (0, envalid_1.str)(),
        PORT: (0, envalid_1.port)(),
        NODE_ENV: (0, envalid_1.str)(),
        JWT_ACCESS_TOKEN_PRIVATE_KEY: (0, envalid_1.str)(),
        JWT_ACCESS_TOKEN_PUBLIC_KEY: (0, envalid_1.str)(),
        JWT_REFRESH_TOKEN_PRIVATE_KEY: (0, envalid_1.str)(),
        JWT_REFRESH_TOKEN_PUBLIC_KEY: (0, envalid_1.str)(),
        EMAIL_HOST: (0, envalid_1.str)(),
        EMAIL_USER: (0, envalid_1.str)(),
        EMAIL_PASS: (0, envalid_1.str)(),
        AWS_REGION: (0, envalid_1.str)(),
        AWS_ACCESS_KEY_ID: (0, envalid_1.str)(),
        AWS_S3_BUCKET_NAME: (0, envalid_1.str)(),
        AWS_SECRET_ACCESS_KEY: (0, envalid_1.str)(),
        DATA_ENCRYPTION_KEY: (0, envalid_1.str)(),
    });
}
exports.default = validateEnv;
//# sourceMappingURL=validateEnv.js.map