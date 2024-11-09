import { Request, Response, Router, NextFunction } from 'express';
import { Pool } from 'mysql';
import { get_post_replies_handler, get_arg_replies_handler, post_reply_post_handler, post_reply_arg_handler, delete_reply_handler, put_reply_like_handler, put_reply_unlike_handler } from '../handlers/handlers';
import express = require('express');

export function reply_router(pool: Pool) {
  const router: Router = express.Router();

  router.get('/post/:id', (req: Request<{ id: number }>, res: Response<Array<Replies>>, next: NextFunction) => { get_post_replies_handler(req, res, next, pool) });
  router.get('/arg/:id', (req: Request<{ id: number }>, res: Response<Array<Replies>>, next: NextFunction) => { get_arg_replies_handler(req, res, next, pool) });
  router.post('/post', (req: Request<{ PID: number, reply: Replies }>, res: Response<{ RID: number }>, next: NextFunction) => { post_reply_post_handler(req, res, next, pool) });
  router.post('/arg', (req: Request<{ AID: number, reply: Replies }>, res: Response<{ RID: number }>, next: NextFunction) => { post_reply_arg_handler(req, res, next, pool) });
  router.delete('/del', (req: Request<{ RID: number }>, res: Response<{ deleted: boolean }>, next: NextFunction) => { delete_reply_handler(req, res, next, pool) });
  router.put('/like', (req: Request<{ RID: number }>, res: Response<{ liked: boolean } | { error: string }>, next: NextFunction) => { put_reply_like_handler(req, res, next, pool) });
  router.put('/unlike', (req: Request<{ RID: number }>, res: Response<{ unliked: boolean }>, next: NextFunction) => { put_reply_unlike_handler(req, res, next, pool) });

  return router;
}
