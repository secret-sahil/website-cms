import { NextFunction, Request, Response } from 'express';
import { successResponse } from '../utils/response';
import { userSchema, userServices } from '.';
import redisClient from '../utils/connectRedis';

export const getMeHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    res.status(200).json(successResponse('SUCCESS', 'User details fetched successfully', user));
  } catch (err: any) {
    next(err);
  }
};

export const updateUser = async (
  req: Request<{}, {}, userSchema.UpdateUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    const image = undefined;
    if (req.file) {
      req.file.originalname = `${user?.id}.${req.file.mimetype.split('/')[1]}`;
      // image = await awsS3services.uploadToS3(req.file!, 'avatar/');
      console.log(image);
    }

    const { firstName, lastName } = req.body;
    const updatedUserData = {
      firstName: firstName || user?.firstName,
      lastName: lastName || user?.lastName,
      photo: image ? image[0] : user?.photo,
    };

    await userServices.updateUser({ id: user?.id }, updatedUserData);

    const userCacheKey = `${user?.id}`;
    const userCacheData = await redisClient.get(userCacheKey);

    if (userCacheData) {
      const parsedUser = JSON.parse(userCacheData);
      const updatedUser = {
        ...parsedUser,
        ...updatedUserData,
      };
      redisClient.set(userCacheKey, JSON.stringify(updatedUser), {
        EX: await redisClient.ttl(userCacheKey),
      });
    }
    res.status(200).json(successResponse('SUCCESS', 'User updated successfully'));
  } catch (err: any) {
    next(err);
  }
};

export const getAllUsersAdminHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userServices.getAllUsers(undefined, {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      password: false,
      photo: true,
      isBlocked: true,
      createdAt: true,
      updatedAt: true,
    });

    res.status(200).json(successResponse('SUCCESS', 'Users fetched successfully', users));
  } catch (err: any) {
    next(err);
  }
};
