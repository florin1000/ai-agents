const express = require('express');
const router = express.Router();
const redisClient = require('../redisClient'); // adjust path as needed
const cache = require('../caching-middleware/caching');
const agents = require('./data.js');

router.get('/agents', (req, res, next) => {
  res.json(agents);
});

router.post('/agents', (req, res, next) => {
  const newAgent = req.body;
  console.log('New Agent:', newAgent);
  agents.push(newAgent)
  res.status(201).json(newAgent);
});


router.get('/agents/:id', cache, async (req, res, next) => {
  const {id} = req.params;
  const agent = agents.find(agent => agent.id === +id);
  console.log('agent ', agent)
  // Store the result in Redis with a TTL (time to live) of 3600 seconds
  await redisClient.setEx(`data:${id}`, 3600, JSON.stringify(agent));

  res.json(agent);
});

router.put('/agents/:id', (req, res, next) => {
  const {id} = req.params;
  const updatedAgent = req.body;
  const index = agents.findIndex(agent => agent.id === +id);

  if (index !== -1) {
    agents.splice(index, 1, {...agents[index], ...updatedAgent});
    res.status(200).json({message: `Agent ${id} updated`, agent: agents[index]});
  } else {
    res.status(404).json({message: `Agent ${id} not found`});
  }
});

router.delete('/agents/:id', (req, res, next) => {
  const {id} = req.params;
  const index = agents.findIndex(agent => agent.id === +id);
  if (index !== -1) {
    agents.splice(index, 1,);
    res.status(200).json({message: `Agent ${id} deleted`, agents});
  } else {
    res.status(404).json({message: `Agent ${id} not found`});
  }
});

router.post('/agents/:id/execute', (req, res, next) => {
  const {id} = req.params;
  res.send(`Agent ${id} is executing a task`);
});

module.exports = router;
