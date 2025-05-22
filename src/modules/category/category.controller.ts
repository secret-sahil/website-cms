import { NextFunction, Request, Response } from 'express';
import { response } from '../utils';
import { categorySchema, categoryServices } from '.';
import { Slugify } from '../utils/functions';
import AppError from '../utils/appError';

export const createCategoryHandler = async (
  req: Request<{}, {}, categorySchema.createCategoryInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;

    await categoryServices.createCategory({
      name,
      slug: Slugify(name),
      createdBy: req.user!.username,
    });

    res.status(200).json(response.successResponse('SUCCESS', 'Created Successfully'));
  } catch (err: any) {
    if (err.code === 'P2002') {
      return next(new AppError(400, 'Dublicate entries are not allowed.'));
    }
    next(err);
  }
};

export const deleteCategoryHandler = async (
  req: Request<categorySchema.deleteCategoryInput, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    await categoryServices.deleteCategory({ id });

    res.status(200).json(response.successResponse('SUCCESS', 'Category Deleted Successfully'));
  } catch (err: any) {
    if (err.code === 'P2003') {
      return next(new AppError(400, "Can't delete data, it's used in other tables."));
    }
    next(err);
  }
};

export const updateCategoryHandler = async (
  req: Request<
    categorySchema.updateCategoryInput['params'],
    {},
    categorySchema.updateCategoryInput['body']
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { name, isPublished } = req.body;

    await categoryServices.updateCategory(
      {
        id,
      },
      {
        name,
        isPublished,
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

export const getCategoryHandler = async (
  req: Request<{}, {}, {}, categorySchema.getCategoryInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search, page, limit } = req.query;
    const category = await categoryServices.getAllCategory(
      search,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
      req.hasAccess
        ? {}
        : {
            isPublished: true,
          },
    );

    res.status(200).json(response.successResponse('SUCCESS', 'Fetched successfully', category));
  } catch (err: any) {
    next(err);
  }
};

export const getCategoryById = async (
  req: Request<categorySchema.getCategoryByIdInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const categorys = await categoryServices.getUniqueCategory({
      id,
    });

    res.status(200).json(response.successResponse('SUCCESS', 'Fetched successfully', categorys));
  } catch (err: any) {
    next(err);
  }
};
