import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

import messageRoute from './routes/message-route';
import userRoute from './routes/user-route';

dotenv.config();

import './core/db/db';

const app = express();

app.use(express.json());

messageRoute(app);
userRoute(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})