import { Request, Response } from 'express';
import config from 'config';
import { response } from '../utils';
/**
 * Default controller to handle the root route.
 * @param _req - Express request object (not used).
 * @param res - Express response object.
 */
export const defaultController = (_req: Request, res: Response): void => {
  try {
    res
      .status(200)
      .json(
        response.successResponse('SUCCESS', `Welcome to ${config.get<string>('appName')} Backend`),
      );
  } catch (error) {
    res
      .status(500)
      .json(
        response.errorResponse(
          'SERVER SIDE ERROR',
          error instanceof Error ? error.message : 'Unknown error occurred.',
        ),
      );
  }
};
