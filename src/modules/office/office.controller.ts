import { NextFunction, Request, Response } from 'express';
import { response } from '../utils';
import { officeSchema, officeServices } from '.';
import AppError from '../utils/appError';

export const createOfficeHandler = async (
  req: Request<{}, {}, officeSchema.createOfficeInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, address, city, state, country, postalCode } = req.body;

    await officeServices.createOffice({
      name,
      address,
      city,
      state,
      country,
      postalCode,
      createdBy: req.user!.username,
    });

    res.status(200).json(response.successResponse('SUCCESS', 'Created Successfully'));
  } catch (err: any) {
    if (err.code === 'P2002') {
      return next(new AppError(400, 'Duplicate entries are not allowed.'));
    }
    next(err);
  }
};

export const deleteOfficeHandler = async (
  req: Request<officeSchema.deleteOfficeInput, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    await officeServices.deleteOffice({ id });

    res.status(200).json(response.successResponse('SUCCESS', 'Office Deleted Successfully'));
  } catch (err: any) {
    if (err.code === 'P2003') {
      return next(new AppError(400, "Can't delete data, it's used in other tables."));
    }
    next(err);
  }
};

export const updateOfficeHandler = async (
  req: Request<
    officeSchema.updateOfficeInput['params'],
    {},
    officeSchema.updateOfficeInput['body']
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { name, address, city, state, country, postalCode } = req.body;

    await officeServices.updateOffice(
      {
        id,
      },
      {
        name,
        address,
        city,
        state,
        country,
        postalCode,
        updatedBy: req.user!.username,
      },
    );

    res.status(200).json(response.successResponse('SUCCESS', 'Updated Successfully'));
  } catch (err: any) {
    if (err.code === 'P2002') {
      return next(new AppError(400, 'Duplicate entries are not allowed.'));
    }
    next(err);
  }
};

export const getOfficeHandler = async (
  req: Request<{}, {}, {}, officeSchema.getOfficeInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search, page, limit } = req.query;
    const office = await officeServices.getAllOffice(
      search,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
    );

    res.status(200).json(response.successResponse('SUCCESS', 'Fetched successfully', office));
  } catch (err: any) {
    next(err);
  }
};

export const getUniqueOffice = async (
  req: Request<officeSchema.getUniqueOfficeInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const offices = await officeServices.getUniqueOffice({
      id,
    });

    res.status(200).json(response.successResponse('SUCCESS', 'Fetched successfully', offices));
  } catch (err: any) {
    next(err);
  }
};
