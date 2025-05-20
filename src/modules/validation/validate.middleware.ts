import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import AppError from '../utils/appError';
import { response } from '../utils';
import { User } from '@prisma/client';
export const validate =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = parsed.body;
      req.query = parsed.query;
      req.params = parsed.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(response.errorResponse('FAIL', error.errors));
      }
      next(error);
    }
  };

export const validateFilePresence = (minFiles: number, maxFiles: number) => {
  return (req: Request & { fileCount?: number }, res: Response, next: NextFunction) => {
    let fileCount: number = 0;
    if (req.file) {
      fileCount = 1;
    } else if (req.files) {
      fileCount = req.files.length as number;
    }

    if (fileCount < minFiles) {
      return next(new AppError(400, `At least ${minFiles} file(s) must be uploaded.`));
    }

    if (fileCount > maxFiles) {
      return next(new AppError(400, `A maximum of ${maxFiles} file(s) can be uploaded.`));
    }

    next();
  };
};

export const requireUser =
  (roles: Array<User['role']>) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return next(new AppError(400, `Session has expired or user doesn't exist`));
      }

      if (roles.includes(user.role)) {
        return next();
      } else {
        return next(new AppError(401, `Unauthorized Access`));
      }
    } catch (err: any) {
      next(err);
    }
  };
