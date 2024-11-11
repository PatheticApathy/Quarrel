import { createPool, Pool } from 'mysql';
import { user_router, post_router, vote_router, like_router, reply_router, follow_router } from './routes/routes';
import { Express, Response, Request, NextFunction } from 'express';
import express = require("express");
import cors = require('cors');

const app: Express = express();
const port: String = '8081';

const pool: Pool = createPool({
  host: 'localhost',
  user: 'qapi',
  password: 'ARGS',
  database: 'QuarrelDB'
});

app.use(cors());
app.use(express.json());
app.use("/", express.static("./greeting/index.html"));
app.use('/user', user_router(pool));
app.use('/post', post_router(pool));
app.use('/vote', vote_router(pool));
app.use('/like', like_router(pool));
app.use('/replies', reply_router(pool));
app.use('/follow', follow_router(pool));

//404 route and error handler midleware
app.use((_req, res, _next) => {
  res.status(404);
  res.json("Page does not exist");
});
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Running on localhost:${port}`);
})
