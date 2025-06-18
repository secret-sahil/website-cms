import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    DATABASE_URL: str(),
    REDIS_URL: str(),

    PORT: port(),
    NODE_ENV: str(),

    JWT_ACCESS_TOKEN_PRIVATE_KEY: str(),
    JWT_ACCESS_TOKEN_PUBLIC_KEY: str(),
    JWT_REFRESH_TOKEN_PRIVATE_KEY: str(),
    JWT_REFRESH_TOKEN_PUBLIC_KEY: str(),

    EMAIL_HOST: str(),
    EMAIL_USER: str(),
    EMAIL_PASS: str(),

    AWS_REGION: str(),
    AWS_ACCESS_KEY_ID: str(),
    AWS_S3_BUCKET_NAME: str(),
    AWS_SECRET_ACCESS_KEY: str(),

    DATA_ENCRYPTION_KEY: str(),
  });
}

export default validateEnv;
