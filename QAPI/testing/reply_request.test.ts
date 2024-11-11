import { beforeAll, expect, jest, test } from '@jest/globals';
import { createPool } from 'mysql';
import { reply_router } from '../routes/replies';
import request from 'supertest';
import { Express, Response, Request, NextFunction } from 'express';
import express = require('express');

//WARNING: This test does not cleanup after itself

const serv: Express = express();

const pool = createPool({
  host: 'localhost',
  user: 'qapi',
  password: 'ARGS',
  database: 'QuarrelDB'
});

beforeAll(() => {
  serv.use(express.json());
  serv.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500);
    res.json({ error: err });
  });

  serv.use('/reply', reply_router(pool));
});

test('Get replies for post', (done) => {
  request(serv)
    .get('/reply/post/1')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done);
});
test('Get replies for arg', (done) => {
  request(serv)
    .get('/reply/arg/1')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done);
});

test('Create post reply', (done) => {
  const reply: Replies = {
    RID: 0,
    Comment: "This is a test",
    Likes: 0,
    Views: 0,
    Poster: 1
  }
  const transac = { PID: 1, reply };
  request(serv)
    .post('/reply/post')
    .send(transac)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done);
});
test('Create arg reply', (done) => {
  const reply: Replies = {
    RID: 0,
    Comment: "This is a test",
    Likes: 0,
    Views: 0,
    Poster: 1
  }
  const transac = { AID: 1, reply };
  request(serv)
    .post('/reply/arg')
    .set('Content-Type', 'application/json')
    .send(transac)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done);
});
