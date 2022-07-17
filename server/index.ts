import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Model, Optional, Sequelize } from 'sequelize';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const postgressDbPw = process.env.POSTGRES_PW;
const sequelize = new Sequelize(`postgres://postgres:${postgressDbPw}@localhost:5432/movie-maker`)

app.use(cors())

app.get('/searchMovie', async (req: Request, res: Response) => {
  const searchQuery = req.query.searchQuery;
  if (!searchQuery) { return; }
  const url = `${process.env.MOVIE_DB_API_URL}/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&query=${searchQuery}`;
  const response = await axios({
    method:'get',
    url
  });
  const { data } = response;
  console.log("🚀 ~ file: index.ts ~ line 24 ~ app.get ~ movies", data);
  res.send(JSON.stringify(data));
});

// app.get('/searchMovie')

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});