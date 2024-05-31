// import Redis from "ioredis";
// import { promisify } from "util";

// export const redisClient = new Redis({
//   password: "4321",
//   name: "postgres",
//   port: 5432,
//   username: "bernardo",
//   host: "localhost",
// });

// export const getRedis = (value: string) => {
//   const syncRedisGet = promisify(redisClient.get).bind(redisClient);
//   return syncRedisGet(value);
// };

// export const setRedis = (key: string, value: string) => {
//   const syncRedisSet = promisify(redisClient.set).bind(redisClient);
//   return syncRedisSet(key, value);
// };
