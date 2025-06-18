export default {
  appName: 'Bytelog Solutions',
  verificationTokenExpiresIn: 10, //minutes
  redisCacheExpiresIn: 30, //days
  refreshTokenExpiresIn: 30, //days
  accessTokenExpiresIn: 1, //days
  origin: [
    'http://localhost:3000',
    'https://infutrix.com',
    'https://www.infutrix.com',
    'https://admin.infutrix.com',
  ],
  // images upload
  cloudfrontBaseUrl: 'https://d26yyyedhrucxb.cloudfront.net',
};
