const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan');
const agentsRouter = require('./routes/agents');
const helmet = require('helmet');


app.use(morgan('combined'));
app.use(helmet());
app.use('/api', agentsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to AI agents app')
})


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
