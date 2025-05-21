export default {
  appName: 'Infutrix',
  verificationTokenExpiresIn: 10, //minutes
  redisCacheExpiresIn: 30, //days
  refreshTokenExpiresIn: 30, //days
  accessTokenExpiresIn: 1, //days
  origin: ['http://localhost:3000'],
  // images upload
  maxFileSize: 500000,
  acceptedImagesType: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  cloudfrontBaseUrl: 'https://d26yyyedhrucxb.cloudfront.net',
};
