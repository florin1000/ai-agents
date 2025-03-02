const redisClient = require('../redisClient');
async function cache(req, res, next) {
  const { id } = req.params; // Adjust based on your route parameters
  try {
    const cachedData = await redisClient.get(`data:${id}`);
    if (cachedData) {
      console.log(`Cache hit for agent ${id}`);
      return res.json(JSON.parse(cachedData));
    }
    next();
  } catch (err) {
    console.error(err);
    next();
  }
}
module.exports = cache;
