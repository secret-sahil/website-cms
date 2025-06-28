import 'dotenv/config';
import express from 'express';
import config from 'config';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import path from 'path';
import validateEnv from './modules/utils/validateEnv';
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import categoriesRouter from './routes/category.routes';
import blogRouter from './routes/blog.routes';
import officeRouter from './routes/office.routes';
import applicationRouter from './routes/application.routes';
import leadRouter from './routes/lead.routes';
import jobOpeningRouter from './routes/jobOpening.routes';
import meidaRouter from './routes/media.routes';
import { errorHandler, notFoundRoute } from './modules/utils/appError';
import { defaultController } from './modules/default';

validateEnv();

const prisma = new PrismaClient();
const app = express();

async function main() {
  // TEMPLATE ENGINE
  app.set('view engine', 'hbs');
  app.set('views', `${__dirname}/views`);
  app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
  // MIDDLEWARE

  // 1.Body Parser
  app.use(express.json({ limit: '10mb' }));

  // 2. Security
  app.use(helmet());

  // 3. Cookie Parser
  app.use(cookieParser());

  // 4. Cors
  app.use(
    cors({
      origin: config.get<string>('origin'),
      credentials: true,
    }),
  );

  // 5. Logger
  if (config.get<string>('env') === 'development') app.use(morgan('dev'));

  // ROUTES
  app.get('/', defaultController.defaultController);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/categories', categoriesRouter);
  app.use('/api/v1/careers', jobOpeningRouter);
  app.use('/api/v1/blog', blogRouter);
  app.use('/api/v1/office', officeRouter);
  app.use('/api/v1/applications', applicationRouter);
  app.use('/api/v1/lead', leadRouter);
  app.use('/api/v1/media', meidaRouter);
  app.get('/test-template', (req, res) => {
    res.render('leadFormResponse');
  });

  // 404 ~ not found error handler
  app.use(notFoundRoute);

  // GLOBAL ERROR HANDLER
  app.use(errorHandler);

  const port = config.get<number>('port');
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

main()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
