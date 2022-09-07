const express = require('express');
const cors = require('cors')
const Redis = require("ioredis");
const dotenv = require("dotenv")

dotenv.config()

const app = express();
const corsOptions = {
  origin: ['http://localhost:3000'],
}
app.use(cors(corsOptions))
app.use(express.json());

const port = 3030;

const redisClient = new Redis(`rediss://:${process.env.REDIS_PW}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);

app.get('/canvasData', async (req, res) => {
  const canvasData = await redisClient.get('canvas');
  res.send(canvasData);
});

app.post('/canvasData', async (req, res) => {
  await redisClient.set('canvas', JSON.stringify(req.body));
  return res.send('ok')
});

app.listen(port)