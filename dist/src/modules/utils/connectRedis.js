"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import config from 'config';
const redis_1 = require("redis");
console.log(process.env.REDIS_URL);
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL,
});
const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis client connect successfully');
        redisClient.set('try', 'Hello Welcome to Express with TypeORM');
    }
    catch (error) {
        console.log(error);
        setTimeout(connectRedis, 5000);
    }
};
connectRedis();
exports.default = redisClient;
//# sourceMappingURL=connectRedis.js.map