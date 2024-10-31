import { beforeAll, expect, jest, test } from '@jest/globals';
import { createPool } from 'mysql'; import { user_router } from '../routes/user';
import { createServer, Server } from 'http';
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

serv.use(express.json());
serv.use('/user', user_router(pool));
serv.use((_req, res, _next) => {
  res.status(404);
  res.json("Page does not exist");
});
serv.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500);
  res.json({ error: err });
});

test('Get user by id(existing user)', (done) => {
  request(serv)
    .get('/user/find/1')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done)
});
test('Get user by id(non-existing user)', (done) => {
  request(serv)
    .get('/user/find/100000000')
    .expect(404, done)
});

test(`signup a user(valid)`, (done) => {
  const user: User = {
    UID: 0,
    Username: "test2",
    Password: "testy",
    Follow_count: 0,
    Bio: "",
    Profile_pic: ""
  }
  request(serv)
    .post("/user/signup")
    .set('Content-Type', 'application/json')
    .send(user)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done)
})
test(`signup a user(duplicate login)`, (done) => {
  const user: User = {
    UID: 0,
    Username: "test2",
    Password: "testy",
    Follow_count: 0,
    Bio: "",
    Profile_pic: ""
  }
  request(serv)
    .post("/user/signup")
    .set('Content-Type', 'application/json')
    .accept('Accept', 'application/json')
    .send(user)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(500, done)
})

test(`User login attempt(valid)`, (done) => {
  const login: Login = {
    username: "test2",
    password: "testy"
  }
  request(serv)
    .post("/user/login")
    .set('Content-Type', 'application/json')
    .send(login)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done);
})
test(`User login attempt(invalid)`, (done) => {
  const login: Login = {
    username: "test2",
    password: "tetty"
  }
  request(serv)
    .post("/user/login")
    .set('Content-Type', 'application/json')
    .send(login)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(404, done)
})


//delete test user from DB 
afterAll((done) => {
  pool.query("DELETE FROM User WHERE Username='test2';", (err, _bad, _also_bad) => { if (err) { throw err } })
});
