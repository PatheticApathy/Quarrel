import { genSaltSync, hashSync } from 'bcrypt'
//import { add_user_handler, get_id_handler, post_login_request_handler } from '../handlers/handlers';
import { get_id_handler } from '../handlers/users';
import { stringify_body } from '../helper';
import { Connection, Pool } from 'mysql';
import { Router, Response, Request } from 'express';
import express = require("express");

const SALT = "$2a$10$3rG14pYiZyUNs0Z9FfFJ5u";

/*
export function user_routes(): void {
  switch (route[2]) {
    case 'signup':
      //validate rest of route and request method and sanatize data
      if (req.method == 'POST' && route.length == 3) {
        stringify_body(req, (err, json) => {
          if (err) {
            console.error(`Error could not get http request body: ${err}`);
            res.status(500);
            res.end(`Error accessing request body`);
          }
          else {
            try {
              const user: User = JSON.parse(json!);
              user.Password = hashSync(user.Password, SALT);
              user.Follow_count = 0;
              add_user_handler(res, user, sql);
            }
            catch (error) {
              console.error(`Error, could not parse json: ${error}`);
              res.writeHead(500);
              res.end(`Error parsing json`);
            }
          }
        });
      }
      break;
    case 'login':
      if (req.method == 'POST' && route.length == 3) {
        stringify_body(req, (err, json) => {
          if (err) {
            console.error(`Error could not get http request body: ${err}`);
            res.writeHead(500);
            res.end(`Error accessing request body`);
          }
          else {
            try {
              const login_attempt: Login = JSON.parse(json!);
              login_attempt.password = hashSync(login_attempt.password, SALT)
              post_login_request_handler(res, login_attempt, sql)
            }
            catch (error) {
              console.error(`Error, could not parse json: ${error}`);
              res.writeHead(500);
              res.end(`Error parsing json`);
            }
          }
        })
      }
      break;
    case 'find':
      if (req.method == 'GET' && route.length == 4) {
        const id: number = Number(route[3]);
        get_id_handler(res, id, sql);
      }
      break;

    case 'update':
      res.writeHead(404);
      res.end("route does not exist yet");
      break;

    default:
      res.writeHead(404);
      res.end("Not a valid route");
  }
}
*/

export function user_router(pool: Pool): Router {
  const router: Router = express.Router();

  router.get('/find/:id', (req: Request<{ id: number }>, res, next) => { get_id_handler(req, res, pool, next) });
  return router;
}


