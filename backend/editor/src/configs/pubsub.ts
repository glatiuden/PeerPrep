import Redis from "ioredis";

export const pub = new Redis(process.env.REDIS_ENDPOINT, {
  password: process.env.REDIS_PASSWORD,
});
export const sub = pub.duplicate();
