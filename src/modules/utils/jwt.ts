import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

export const signJwt = (
  payload: object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions,
) => {
  const privateKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey',
): T | null => {
  try {
    const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return null;
  }
};
