import { post_like_handler_p, get_likes_handler_p, get_liked_posts_handle_p, post_unlike_handler_p } from '../handlers/handlers';
import { Connection, Pool } from 'mysql';
import { Router, Response, Request } from 'express';
import express = require("express");

export function like_router(pool: Pool): Router {
  const router: Router = express.Router();

  router.get('/:id', (req: Request<{ id: number }>, res, next) => { get_likes_handler_p(req, res, pool, next) })
  router.post('/check', (req: Request<{ UID: number, PIDs: Array<number> }>, res, next) => { get_liked_posts_handle_p(req, res, pool, next) })
  router.put('/like', (req: Request<{ UID: number, PID: number }>, res, next) => { post_like_handler_p(req, res, pool, next) });
  router.put('/unlike', (req: Request<{ UID: number, PID: number }>, res, next) => { post_unlike_handler_p(req, res, pool, next) });

  return router;
}
