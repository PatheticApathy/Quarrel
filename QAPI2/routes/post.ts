import { get_post_handler, post_handler, get_arg_handler, argument_handler, get_reply_handler, reply_handler, get_random_args_handler, get_random_posts_handler } from '../handlers/handlers';
import { Pool } from 'mysql';
import { Router, Response, Request } from 'express';
import express = require("express");

export function post_router(pool: Pool): Router {
  const router: Router = express.Router();

  router.get('/post/:id', (req: Request<{ id: number }>, res, next) => { get_post_handler(req, res, pool, next) });
  router.get('/post/batch', (req, res, next) => { get_random_posts_handler(res, pool, next) })
  router.post('/post', (req: Request<Post>, res: Response, next) => { post_handler(req, res, pool, next) });
  router.get('/args/:id', (req: Request<{ id: number }>, res, next) => { get_arg_handler(req, res, pool, next) })
  router.get('/args/batch', (req, res, next) => { get_random_args_handler(res, pool, next) })
  router.post('/args', (req: Request<Arguments>, res, next) => { argument_handler(req, res, pool, next) })
  router.get('/replies/:id', (req: Request<{ id: number }>, res, next) => { get_reply_handler(req, res, pool, next) })
  router.post('/replies', (req: Request<Replies>, res, next) => { reply_handler(req, res, pool, next) })

  return router;
}
