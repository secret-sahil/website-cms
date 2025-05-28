import { NextFunction, Request, Response } from 'express';
import { response } from '../utils';
import { mediaSchema, mediaServices } from '.';
import AppError from '../utils/appError';
import { MediaType } from '@prisma/client';
import { awsS3services } from '../upload';
import { getMediaType } from '../utils/functions';

export const createMediaHandler = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next(new AppError(400, 'Media file is required.'));
  }
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  const newFilename = req.file.originalname.includes('.')
    ? req.file.originalname.replace(/(\.[^.]*)$/, `-${randomSuffix}$1`)
    : req.file.originalname + `-${randomSuffix}`;
  req.file.originalname = newFilename;

  try {
    const image = await awsS3services.uploadToS3(req.file!, 'media-infutrix/');

    await mediaServices.createMedia({
      url: image[0],
      name: newFilename,
      type: getMediaType(req.file.mimetype),
      createdBy: req.user!.username,
    });

    res
      .status(200)
      .json(response.successResponse('SUCCESS', 'Created Successfully', { image: image[0] }));
  } catch (err: any) {
    await awsS3services.deleteFromS3(`media-infutrix/${newFilename}`);
    next(err);
  }
};

export const deleteMediaHandler = async (
  req: Request<mediaSchema.deleteMediaInput, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const media = await mediaServices.getUniqueMedia({ id });
    await mediaServices.deleteMedia({ id });
    await awsS3services.deleteFromS3(`media-infutrix/${media.name}`);
    res.status(200).json(response.successResponse('SUCCESS', 'Media Deleted Successfully'));
  } catch (err: any) {
    if (err.code === 'P2003') {
      return next(new AppError(400, "Can't delete data, it's used in other tables."));
    }
    next(err);
  }
};

export const updateMediaHandler = async (
  req: Request<mediaSchema.updateMediaInput['params']>,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file) {
    return next(new AppError(400, 'Media file is required.'));
  }
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  const newFilename = req.file.originalname.includes('.')
    ? req.file.originalname.replace(/(\.[^.]*)$/, `-${randomSuffix}$1`)
    : req.file.originalname + `-${randomSuffix}`;
  req.file.originalname = newFilename;

  try {
    const { id } = req.params;
    const image = await awsS3services.uploadToS3(req.file!, 'media-infutrix/');

    await mediaServices.updateMedia(
      {
        id,
      },
      {
        url: image[0],
        type: getMediaType(req.file.mimetype),
        name: newFilename,
        updatedBy: req.user!.username,
      },
    );

    res
      .status(200)
      .json(response.successResponse('SUCCESS', 'Updated Successfully', { image: image[0] }));
  } catch (err: any) {
    await awsS3services.deleteFromS3(`media-infutrix/${newFilename}`);
    if (err.code === 'P2002') {
      return next(new AppError(400, 'Dublicate entries are not allowed.'));
    }
    next(err);
  }
};

export const getMediaHandler = async (
  req: Request<{}, {}, {}, mediaSchema.getMediaInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit, type: rawType } = req.query;
    const type = rawType ? (JSON.parse(rawType) as MediaType[]) : undefined;

    const media = await mediaServices.getAllMedia(
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
      {
        ...(type ? { type: { in: type } } : {}),
      },
    );

    res.status(200).json(response.successResponse('SUCCESS', 'Fetched successfully', media));
  } catch (err: any) {
    next(err);
  }
};
