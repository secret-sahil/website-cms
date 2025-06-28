export default {
  appName: 'Bytelog Solutions',
  verificationTokenExpiresIn: 10, //minutes
  redisCacheExpiresIn: 30, //days
  refreshTokenExpiresIn: 30, //days
  accessTokenExpiresIn: 1, //days
  origin: [
    'https://bytelogsolutions.com',
    'https://www.bytelogsolutions.com',
    'https://admin.bytelogsolutions.com',
  ],
  // images upload
  cloudfrontBaseUrl: 'https://d26yyyedhrucxb.cloudfront.net',
};
