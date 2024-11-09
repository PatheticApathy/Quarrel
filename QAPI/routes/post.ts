import { Request, Response, Router, NextFunction } from 'express';
import { Pool } from 'mysql';
import { argument_handler, get_arg_handler, get_post_handler, get_random_args_handler, get_random_posts_handler, post_handler } from '../handlers/handlers';
import express = require('express');

export function post_router(pool: Pool) {
  const router: Router = express.Router();

  router.get('/post/batch', (req, res: Response<Array<Post>>, next: NextFunction) => { get_random_posts_handler(req, res, next, pool) });
  router.get('/post/:id', (req: Request<{ id: number }>, res: Response<Post>, next: NextFunction) => { get_post_handler(req, res, next, pool) });
  router.post('/post', (req: Request<Post>, res: Response<number>, next: NextFunction) => { post_handler(req, res, next, pool) });
  router.get('/args/batch', (req: Request, res: Response<Array<Arguments>>, next: NextFunction) => { get_random_args_handler(req, res, next, pool) });
  router.get('/args/:id', (req: Request<{ id: number }>, res: Response<Arguments>, next: NextFunction) => { get_arg_handler(req, res, next, pool) });
  router.post('/args', (req: Request<Arguments>, res: Response, next) => { argument_handler(req, res, next, pool) });

  return router;

}
