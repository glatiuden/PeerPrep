import Redis from "ioredis";

export const pub = new Redis("//redis-10500.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:10500", {
  password: "Os7l8NqAmborLVL9tkfjnDm76DKPwFKw",
});
export const sub = pub.duplicate();
