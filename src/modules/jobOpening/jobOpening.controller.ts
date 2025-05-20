import { NextFunction, Request, Response } from 'express';
import { response } from '../utils';
import { jobOpeningSchema, jobOpeningServices } from '.';
import AppError from '../utils/appError';
import { awsS3services } from '../upload';

export const createJobOpeningHandler = async (
  req: Request<{}, {}, jobOpeningSchema.createJobOpeningInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, locationId, experience } = req.body;

    await jobOpeningServices.createJobOpening({
      title,
      description,
      locationId,
      experience,
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

export const applyJobOpeningHandler = async (
  req: Request<{}, {}, jobOpeningSchema.applyJobOpeningInput>,
  res: Response,
  next: NextFunction,
) => {
  const resumeUUID = crypto.randomUUID();
  try {
    const {
      fullName,
      jobOpeningId,
      email,
      phone,
      coverLetter,
      linkedIn,
      wheredidyouhear,
      hasSubscribedToNewsletter,
    } = req.body;
    if (!req.file) {
      return next(new AppError(400, 'Resume is required.'));
    }
    req.file.originalname = `${req.file.originalname}${resumeUUID}.pdf`;
    const image = await awsS3services.uploadToS3(req.file!, 'resume-infutrix/');

    await jobOpeningServices.createJobApplication({
      fullName,
      jobOpeningId,
      email,
      phone,
      coverLetter,
      linkedIn,
      resume: image[0],
      wheredidyouhear,
      hasSubscribedToNewsletter: hasSubscribedToNewsletter === 'yes',
      createdBy: fullName,
    });

    res.status(200).json(response.successResponse('SUCCESS', 'Created Successfully'));
  } catch (err: any) {
    await awsS3services.deleteFromS3(`resume-infutrix/${resumeUUID}`);
    if (err.code === 'P2002') {
      return next(new AppError(400, 'Dublicate entries are not allowed.'));
    }
    next(err);
  }
};

export const deleteJobOpeningHandler = async (
  req: Request<jobOpeningSchema.deleteJobOpeningInput, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    await jobOpeningServices.deleteJobOpening({ id });

    res.status(200).json(response.successResponse('SUCCESS', 'JobOpening Deleted Successfully'));
  } catch (err: any) {
    if (err.code === 'P2003') {
      return next(new AppError(400, "Can't delete data, it's used in other tables."));
    }
    next(err);
  }
};

export const updateJobOpeningHandler = async (
  req: Request<
    jobOpeningSchema.updateJobOpeningInput['params'],
    {},
    jobOpeningSchema.updateJobOpeningInput['body']
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { title, description, locationId, experience, isPublished } = req.body;

    await jobOpeningServices.updateJobOpening(
      {
        id,
      },
      {
        title,
        description,
        locationId,
        experience,
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

export const getJobOpeningHandler = async (
  req: Request<{}, {}, {}, jobOpeningSchema.getJobOpeningInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search, page, limit } = req.query;

    const jobOpening = await jobOpeningServices.getAllJobOpening(
      search,
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined,
      {
        isPublished: true,
      },
      {
        location: {
          select: {
            id: true,
            city: true,
          },
        },
      },
    );

    res.status(200).json(response.successResponse('SUCCESS', 'Fetched successfully', jobOpening));
  } catch (err: any) {
    next(err);
  }
};

export const getJobOpeningById = async (
  req: Request<jobOpeningSchema.getJobOpeningByIdInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const jobOpenings = await jobOpeningServices.getUniqueJobOpening({
      id,
    });

    res.status(200).json(response.successResponse('SUCCESS', 'Fetched successfully', jobOpenings));
  } catch (err: any) {
    next(err);
  }
};
