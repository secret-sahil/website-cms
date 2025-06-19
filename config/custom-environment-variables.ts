export default {
  port: 'PORT',
  env: 'NODE_ENV',
  accessTokenPrivateKey: 'JWT_ACCESS_TOKEN_PRIVATE_KEY',
  accessTokenPublicKey: 'JWT_ACCESS_TOKEN_PUBLIC_KEY',
  refreshTokenPrivateKey: 'JWT_REFRESH_TOKEN_PRIVATE_KEY',
  refreshTokenPublicKey: 'JWT_REFRESH_TOKEN_PUBLIC_KEY',

  // redisUrl: 'REDIS_URL',

  smtp: {
    service: 'EMAIL_HOST',
    user: 'EMAIL_USER',
    pass: 'EMAIL_PASS',
  },

  awsRegion: 'AWS_REGION',
  awsAccessKeyID: 'AWS_ACCESS_KEY_ID',
  awsSecretAccessKey: 'AWS_SECRET_ACCESS_KEY',
  awsBucketName: 'AWS_S3_BUCKET_NAME',

  dataEncryptionKey: 'DATA_ENCRYPTION_KEY',
};
