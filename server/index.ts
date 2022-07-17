import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Model, Optional, Sequelize } from 'sequelize';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const postgressDbPw = process.env.POSTGRES_PW;
const sequelize = new Sequelize(`postgres://postgres:${postgressDbPw}@localhost:5432/movie-maker`)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScrip');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});