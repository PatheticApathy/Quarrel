import { beforeAll, expect, jest, test } from '@jest/globals';
import { createPool } from 'mysql';
import { route_request } from '../app'
import { createServer, Server } from 'http';
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
  serv = server.listen(3030)
});

test('Get user by id(existing user)', (done) => {
  request(serv)
    .get('/user/find/1')
    .expect('Content-Type', 'application/json')
    .expect(200, done)
})
test('Get user by id(non-existing user)', (done) => {
  request(serv)
    .get('/user/find/100000000')
    .expect(404, done)
})

test(`signup a user(valid)`, (done) => {
  const user: User = {
    UID: 0,
    Username: "test2",
    Password: "testy",
    Follow_count: 0
  }
  request(serv)
    .post("/user/signup")
    .send(user)
    .expect('Content-Type', 'application/json')
    .expect(200, done)
})
test(`signup a user(duplicate login)`, (done) => {
  const user: User = {
    UID: 0,
    Username: "test2",
    Password: "testy",
    Follow_count: 0
  }
  request(serv)
    .post("/user/signup")
    .send(user)
    .expect('Content-Type', 'application/json')
    .expect(500, done)
})

test(`User login attempt(valid)`, (done) => {
  const login: Login = {
    username: "test2",
    password: "testy"
  }
  request(serv)
    .post("/user/login")
    .send(login)
    .set("Accept", "application/json")
    .expect('Content-Type', 'application/json')
    .expect(200, done);
})
test(`User login attempt(invalid)`, (done) => {
  const login: Login = {
    username: "test2",
    password: "tetty"
  }
  request(serv)
    .post("/user/login")
    .send(login)
    .set("Accept", "application/json")
    .expect('Content-Type', 'application/json')
    .expect(404, done);
})


//delete test user from DB 
afterAll((done) => {
  pool.query("DELETE FROM User WHERE Username='test2';", (err, _bad, _also_bad) => { if (err) { throw err } })
  serv.close(done);
});
