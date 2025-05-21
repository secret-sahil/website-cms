require('dotenv').config();
import express from 'express';
import config from 'config';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import validateEnv from './modules/utils/validateEnv';
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import categoriesRouter from './routes/category.routes';
import jobOpeningRouter from './routes/jobOpening.routes';
import { errorHandler, notFoundRoute } from './modules/utils/appError';
import { defaultController } from './modules/default';

// import nodemailer from 'nodemailer';
// (async function () {
//   const credentials = await nodemailer.createTestAccount();
//   console.log(credentials);
// })();

validateEnv();

const prisma = new PrismaClient();
const app = express();

async function bootstrap() {
  // TEMPLATE ENGINE
  app.set('view engine', 'pug');
  app.set('views', `${__dirname}/views`);

  // MIDDLEWARE

  // 1.Body Parser
  app.use(express.json({ limit: '10mb' }));

  // 2. Cookie Parser
  app.use(cookieParser());

  // 2. Cors
  app.use(
    cors({
      origin: config.get<string>('origin'),
      credentials: true,
    }),
  );

  // 3. Logger
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

  // ROUTES
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/categories', categoriesRouter);
  app.use('/api/v1/careers', jobOpeningRouter);

  // Testing
  app.get('/', defaultController.defaultController);

  // 404 ~ not found error handler
  app.use(notFoundRoute);

  // GLOBAL ERROR HANDLER
  app.use(errorHandler);

  const port = config.get<number>('port');
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
