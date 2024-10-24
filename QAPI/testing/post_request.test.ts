import { beforeAll, expect, jest, test } from '@jest/globals';
import { createServer, Server } from 'http';
import { route_request } from '../app';
import { createPool } from 'mysql';
import request from 'supertest';


let serv: Server;

const pool = createPool({
  host: 'localhost',
  user: 'qapi',
  password: 'ARGS',
  database: 'QuarrelDB'
});

beforeAll(() => {
  const server = createServer((req, res) => {
    route_request(req, res, pool);
  });
  serv = server.listen(3001)
});

test('Get 10 random args request', (done) => {
  request(serv)
    .get('/post/post/batch')
    .expect('Content-Type', 'application/json')
    .expect(200, done);
});
test('Get 10 random posts request', (done) => {
  request(serv)
    .get('/post/args/batch')
    .expect('Content-Type', 'application/json')
    .expect(200, done);
})

afterAll((done) => {
  serv.close(done);
});
