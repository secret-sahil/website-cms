import config from 'config';
import { createClient } from 'redis';
console.log(config.get<string>('redisUrl'));
const redisClient = createClient({
  url: process.env.REDIS_URL || config.get<string>('redisUrl'),
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connect successfully');
    redisClient.set('try', 'Hello Welcome to Express with TypeORM');
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default redisClient;
