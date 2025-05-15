import { User } from '@prisma/client';
import config from 'config';
import { omit } from 'lodash';
import redisClient from '../utils/connectRedis';
import { signJwt } from '../utils/jwt';

export const excludedFields = ['password', 'isBlocked', 'createdBy', 'updatedBy'];

export const signTokens = async (user: User) => {
  // 1. Create Session
  redisClient.set(`${user.id}`, JSON.stringify(omit(user, excludedFields)), {
    EX: config.get<number>('redisCacheExpiresIn') * 24 * 60 * 60,
  });

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}d`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}d`,
  });

  return { access_token, refresh_token };
};
