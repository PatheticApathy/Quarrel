import { beforeAll, expect, jest, test } from '@jest/globals';
import { createPool } from 'mysql';
import { post_router } from '../routes/post';
import request from 'supertest';
import { Express } from 'express';
import express = require('express');


const serv: Express = express();

const pool = createPool({
  host: 'localhost',
  user: 'qapi',
  password: 'ARGS',
  database: 'QuarrelDB'
});

beforeAll(() => {
  serv.use('/post', post_router(pool));
});

test('Get 10 random args request', (done) => {
  request(serv)
    .get('/post/post/batch')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done);
});
test('Get 10 random posts request', (done) => {
  request(serv)
    .get('/post/args/batch')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done);
})
