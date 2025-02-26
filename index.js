const express = require('express')
const app = express()
const port = 3000

const agentsRouter = require('./router/agents');
app.use('/api', agentsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to AI agents app')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
