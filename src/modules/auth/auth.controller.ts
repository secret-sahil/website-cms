import { CookieOptions, NextFunction, Request, Response } from 'express';
import config from 'config';
import bcrypt from 'bcryptjs';
import AppError from '../utils/appError';
import redisClient from '../utils/connectRedis';
import { verifyJwt } from '../utils/jwt';
import { userServices } from '../user';
import { signTokens } from './auth.service';
import { response } from '../utils';
import { authSchema } from '.';

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + config.get<number>('accessTokenExpiresIn') * 24 * 60 * 60 * 1000),
  maxAge: config.get<number>('accessTokenExpiresIn') * 24 * 60 * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + config.get<number>('refreshTokenExpiresIn') * 24 * 60 * 60 * 1000),
  maxAge: config.get<number>('refreshTokenExpiresIn') * 24 * 60 * 60 * 1000,
};

export const registerUserHandler = async (
  req: Request<{}, {}, authSchema.registerUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user?.username;
    const { firstName, lastName, password, username, role } = req.body;

    const encryptedPasswrd = await bcrypt.hash(password, 12);

    await userServices.createUser({
      username,
      firstName,
      lastName,
      role,
      password: encryptedPasswrd,
      createdBy: user,
    });

    res.status(200).json(response.successResponse('SUCCESS', 'User Registred Successfully'));
  } catch (err: any) {
    next(err);
  }
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let req_refresh_token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Refresh')) {
      req_refresh_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.refresh_token) {
      req_refresh_token = req.cookies.refresh_token;
    }

    const message = 'Could not refresh access token';

    if (!req_refresh_token) {
      return next(new AppError(403, message));
    }

    // Validate refresh token
    const decoded = verifyJwt<{ sub: string }>(req_refresh_token, 'refreshTokenPublicKey');

    if (!decoded) {
      return next(new AppError(403, message));
    }

    // Check if user has a valid session
    const session = await redisClient.get(`${decoded.sub}`);

    if (!session) {
      return next(new AppError(403, message));
    }

    // Check if user still exist
    const user = await userServices.findUniqueUser({ id: JSON.parse(session).id });

    if (!user) {
      return next(new AppError(403, message));
    }

    // Sign new access token
    const { access_token, refresh_token } = await signTokens(user);
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json(
      response.successResponse('SUCCESS', 'Token refreshed', {
        access_token: access_token,
        refresh_token: refresh_token,
        loggedIn: true,
      }),
    );
  } catch (err: any) {
    next(err);
  }
};

function logout(res: Response) {
  res.cookie('access_token', '', { maxAge: 1 });
  res.cookie('refresh_token', '', { maxAge: 1 });
  res.cookie('logged_in', '', { maxAge: 1 });
}

export const logoutUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      await redisClient.del(`${req.user.id}`);
    }
    logout(res);
    res.status(200).json(response.successResponse('SUCCESS', 'Logged out successfully'));
  } catch (err: any) {
    next(err);
  }
};

export const changePasswordHandler = async (
  req: Request<{}, {}, authSchema.changePasswordInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.user!;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    await userServices.updateUser({ id }, { password: hashedPassword });

    res.status(200).json(response.successResponse('SUCCESS', 'Password changed successfully'));
  } catch (err: any) {
    next(err);
  }
};

export const loginWithPasswordHandler = async (
  req: Request<{}, {}, authSchema.loginWithPasswordInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    const user = await userServices.findUniqueUser({ username });
    if (!user) {
      return res
        .status(404)
        .json(response.errorResponse('NOT_FOUND', 'User not found, please sign up.'));
    }
    if (await bcrypt.compare(password, user.password)) {
      // Sign Tokens
      const { access_token, refresh_token } = await signTokens(user);
      res.cookie('access_token', access_token, accessTokenCookieOptions);
      res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
      res.cookie('logged_in', true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      res.status(200).json(
        response.successResponse('SUCCESS', 'Logged in successfully', {
          access_token: access_token,
          refresh_token: refresh_token,
          loggedIn: true,
        }),
      );
    } else {
      res.status(400).json(response.errorResponse('FAIL', 'Wrong Password'));
    }
  } catch (err: any) {
    next(err);
  }
};
