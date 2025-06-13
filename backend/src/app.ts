import './config/connectiondb';

import cors from 'cors';
import express from 'express';

import { category, game, home, platform, user } from './routes';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(home.routes);
app.use(user.routes);
app.use(game.routes);
app.use(category.routes);
app.use(platform.routes);

export default app;
