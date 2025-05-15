import { Request, Response, NextFunction } from 'express';
import { errorResponse } from './response';
import { Prisma } from '@prisma/client';
import { prismaError } from 'prisma-better-errors';
export default class AppError extends Error {
  status: string;
  isOperational: boolean;
  constructor(
    public statusCode: number = 500,
    public message: string,
  ) {
    super(message);
    this.status = `${statusCode}`.startsWith('4') ? 'FAIL' : 'ERROR';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 404 - Not Found Error Handler
 * @param _req - Express request object (not used).
 * @param res - Express response object.
 * @param _next - Express next function (not used).
 */
export const notFoundRoute = (_req: Request, res: Response): void => {
  res.status(404).json(errorResponse('UNKNOWN ACCESS', 'Sorry! Your requested URL was not found.'));
};

/**
 * 500 - Internal Server Error Handler
 * @param err - Error object.
 * @param _req - Express request object (not used).
 * @param res - Express response object.
 * @param next - Express next function.
 */
export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // console.error(err); // Log the error for debugging

  if (res.headersSent) {
    return next(new Error('Something went wrong. App server error.'));
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res
      .status(err.statusCode || 500)
      .json(
        errorResponse(
          err.status || 'SERVER SIDE ERROR',
          new prismaError(err).message || 'Something went wrong. There was an error.',
        ),
      );
  } else {
    res
      .status(err.statusCode || 500)
      .json(
        errorResponse(
          err.status || 'SERVER SIDE ERROR',
          err.message || 'Something went wrong. There was an error.',
        ),
      );
  }
};
