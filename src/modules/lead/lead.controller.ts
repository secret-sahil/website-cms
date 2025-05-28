import { NextFunction, Request, Response } from 'express';
import { response } from '../utils';
import { leadSchema, leadServices } from '.';
import AppError from '../utils/appError';

export const createLeadHandler = async (
  req: Request<{}, {}, leadSchema.createLeadInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullName, email, phone, jobTitle, company, message, budget, source } = req.body;

    await leadServices.createLead({
      fullName,
      email,
      phone,
      jobTitle,
      company,
      message,
      budget,
      source,
    });

    res.status(200).json(response.successResponse('SUCCESS', 'Created Successfully'));
  } catch (err: any) {
    if (err.code === 'P2002') {
      return next(new AppError(400, 'Dublicate entries are not allowed.'));
    }
    next(err);
  }
};

export const updateLeadHandler = async (
  req: Request<leadSchema.updateLeadInput['params'], {}, leadSchema.updateLeadInput['body']>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { isOpened } = req.body;

    await leadServices.updateLead(
      {
        id,
      },
      {
        isOpened,
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

export const getLeadHandler = async (
  req: Request<{}, {}, {}, leadSchema.getLeadInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search, page, limit } = req.query;

    const lead = await leadServices.getAllLead(
      search,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
    );

    res.status(200).json(response.successResponse('SUCCESS', 'Fetched successfully', lead));
  } catch (err: any) {
    next(err);
  }
};

export const getUniqueLead = async (
  req: Request<leadSchema.getUniqueLeadInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const leads = await leadServices.getUniqueLead({
      id: id,
    });

    res.status(200).json(response.successResponse('SUCCESS', 'Fetched successfully', leads));
  } catch (err: any) {
    next(err);
  }
};
