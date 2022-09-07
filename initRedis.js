
const Redis = require("ioredis");
const dotenv = require("dotenv")

dotenv.config()

const redisClient = new Redis(`rediss://:${process.env.REDIS_PW}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);

const blankCanvas = [...Array(32).keys()].map((i) => {
  return [...Array(32).keys()].map(() => false);
})

redisClient.set('canvas', JSON.stringify(blankCanvas))

