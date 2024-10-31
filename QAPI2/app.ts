import { createPool, Pool } from 'mysql';
//import { user_routes, post_routes, vote_routes, user_router } from './routes/routes';
import { user_router, post_router, vote_router } from './routes/routes';
import { Express } from 'express';
import express = require("express");
import bodyParser = require('body-parser');

const app: Express = express();
const port: String = '8081';

const pool = createPool({
  host: 'localhost',
  user: 'qapi',
  password: 'ARGS',
  database: 'QuarrelDB'
});

app.use(express.json());
app.use(bodyParser.json());
app.use("/", express.static("./greeting/index.html"));
app.use('/user', user_router(pool));
app.use('/post', post_router(pool));
app.use('/vote', vote_router(pool));
//TODO: make 404 route and error handler midleware

app.listen(port, () => {
  console.log(`Running on localhost:${port}`);
})
