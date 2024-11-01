import { add_user_handler, get_id_handler, get_random_users_handler, get_search_handler, post_login_request_handler } from '../handlers/handlers';
import { Connection, Pool } from 'mysql';
import { Router, Response, Request } from 'express';
import express = require("express");

export function user_router(pool: Pool): Router {
  const router: Router = express.Router();

  router.get('/find/:id', (req: Request<{ id: number }>, res, next) => { get_id_handler(req, res, pool, next) });
  router.get('/search/:search', (req: Request<{ search: string }>, res, next) => { get_search_handler(req, res, next, pool) });
  router.get('/batch', (req: Request, res, next) => { get_random_users_handler(req, res, next, pool) });
  router.post('/login', (req: Request<Login>, res: Response, next) => { post_login_request_handler(req, res, next, pool) })
  router.post('/signup', (req: Request<User>, res: Response, next) => { add_user_handler(req, res, next, pool) });
  router.put('/update', (req, res, next) => { next(new Error("Does not exist yet")) })

  return router;
}


