import { beforeAll, expect, jest, test } from '@jest/globals';
import { createPool } from 'mysql';
import { like_router } from '../routes/like';
import request from 'supertest';
import { Express, Response, Request, NextFunction } from 'express';
import express = require('express');

const pool = createPool({
  host: 'localhost',
  user: 'qapi',
  password: 'ARGS',
  database: 'QuarrelDB'
});

let serv: Express = express();

beforeAll(() => {
  serv.use(express.json());
  serv.use('/like', like_router(pool));
  serv.use((_req, res, _next) => {
    res.status(404);
    res.json("Page does not exist");
  });
  serv.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500);
    res.json({ error: err });
  });
})

test('Get likes by id for a post)', (done) => {
  request(serv)
    .get('/like/1')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done)
});
test('Get user by id for post(non-existing)', (done) => {
  request(serv)
    .get('/like/100000000')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(404, done)
});

test('Like a post', (done) => {
  request(serv)
    .post('/like/like')
    .set('Content-Type', 'application/json')
    .send({ UID: 1, PID: 2 })
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done)
});

test(`Check if user liked a list of post`, (done) => {
  const json_package = {
    UID: 1,
    PIDs: [1, 2, 3]
  };
  request(serv)
    .post("/like/check")
    .set('Content-Type', 'application/json')
    .send(json_package)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done)
});


test('Unlike a post', (done) => {
  request(serv)
    .post('/like/unlike')
    .set('Content-Type', 'application/json')
    .send({ UID: 1, PID: 2 })
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done)
});

