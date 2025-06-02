import { NextFunction, Request, Response } from 'express';
import { response } from '../utils';
import { applicationSchema, applicationServices } from '.';
import AppError from '../utils/appError';

export const deleteApplicationHandler = async (
  req: Request<applicationSchema.deleteApplicationInput, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    await applicationServices.deleteApplication({ id });

    res.status(200).json(response.successResponse('SUCCESS', 'Application Deleted Successfully'));
  } catch (err: any) {
    if (err.code === 'P2003') {
      return next(new AppError(400, "Can't delete data, it's used in other tables."));
    }
    next(err);
  }
};

export const updateApplicationHandler = async (
  req: Request<
    applicationSchema.updateApplicationInput['params'],
    {},
    applicationSchema.updateApplicationInput['body']
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await applicationServices.updateApplication(
      {
        id,
      },
      {
        status,
        updatedBy: req.user!.username,
      },
    );

    res.status(200).json(response.successResponse('SUCCESS', 'Updated Successfully'));
  } catch (err: any) {
    if (err.code === 'P2002') {
      return next(new AppError(400, 'Dublicate entries are not allowed.'));
    }
    next(err);
  }
};

export const getApplicationHandler = async (
  req: Request<{}, {}, {}, applicationSchema.getApplicationInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search, page, limit } = req.query;
    const application = await applicationServices.getAllApplication(
      search,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
    );

    res.status(200).json(response.successResponse('SUCCESS', 'Fetched successfully', application));
  } catch (err: any) {
    next(err);
  }
};

export const getApplicationById = async (
  req: Request<applicationSchema.getApplicationByIdInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const applications = await applicationServices.getUniqueApplication({
      id,
    });

    res.status(200).json(response.successResponse('SUCCESS', 'Fetched successfully', applications));
  } catch (err: any) {
    next(err);
  }
};
