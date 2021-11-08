import { createClient, RedisClient } from "redis";
import { promisify } from "util";

export default class Redis {
  private static redis_instance: Redis;
  redis_client: undefined | RedisClient;
  getAsync!: (key: string) => Promise<string | null>;
  setAsync!: (key: string, records: any, mode: string, duration: number) => Promise<any>;
  has_redis = false;

  constructor() {
    if (Redis.redis_instance) {
      return;
    }
    const REDIS_ENDPOINT = process.env.REDIS_ENDPOINT;
    if (!REDIS_ENDPOINT) {
      this.has_redis = false;
      console.warn("Redis Endpoint not found. Redis is not established");
      return;
    }
    const redis_client = createClient(REDIS_ENDPOINT, { auth_pass: process.env.REDIS_PASSWORD });
    redis_client.on("connect", () => {
      console.log("Succesfully connected to Redis");
      this.has_redis = true;
    });

    this.redis_client = redis_client;
    this.getAsync = promisify(redis_client.get).bind(redis_client);
    this.setAsync = promisify(redis_client.set).bind(redis_client);
    Redis.redis_instance = this;
  }

  static getInstance(): Redis {
    if (Redis.redis_instance) {
      return Redis.redis_instance;
    }

    new Redis();
    return Redis.redis_instance;
  }
}

const redisClient = Redis.getInstance();

export { redisClient };
