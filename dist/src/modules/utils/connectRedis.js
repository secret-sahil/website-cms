"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: config_1.default.get('redisUrl'),
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