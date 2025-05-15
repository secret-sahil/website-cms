import { NextFunction, Request, Response } from 'express';
import { localStorage } from '.';
import { response } from '../utils';
import { randomUUID } from 'crypto';

interface CustomRequest extends Request {
  // eslint-disable-next-line no-undef
  file?: Express.Multer.File;
}

export const uploadSingleFileHandler = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    let image = undefined;
    if (req.file) {
      req.file.originalname = `${req.file.originalname}${randomUUID()}.${req.file.mimetype.split('/')[1]}`;
      image = await localStorage.uploadToLocal(req.file, 'images/');
    }

    res.status(200).json(response.successResponse('SUCCESS', 'Uploaded Successfully', image![0]));
  } catch (err: any) {
    next(err);
  }
};
