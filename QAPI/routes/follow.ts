import { get_follow_count_handler, get_followers_handler, get_following_handler, follow_handler } from '../handlers/handlers';
import { Connection, Pool } from 'mysql';
import { Router, Response, Request } from 'express';
import express = require("express");

export function follow_router(pool: Pool): Router {
  const router: Router = express.Router();

  router.get('/count/:id', (req: Request<{ id: number }>, res, next) => { get_follow_count_handler(req, res, pool, next) })
  router.get('/followers/:id', (req: Request<{ id: number }>, res, next) => { get_followers_handler(req, res, pool, next) })
  router.get('/following/:id', (req: Request<{ id: number }>, res, next) => { get_following_handler(req, res, pool, next) })
  router.put('', (req: Request<{ FID: number, IID: number }>, res, next) => { follow_handler(req, res, pool, next) });

  return router;
}