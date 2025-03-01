const redis = require('redis');

const redisClient = redis.createClient();
redisClient.on('error', (err) => console.error('Redis Client Error', err));

// If using Redis v4+, remember to connect:
(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
