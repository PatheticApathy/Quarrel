import { like_handler, get_likes_handler } from '../handlers/handlers';
import { Connection, Pool } from 'mysql';
import { Router, Response, Request } from 'express';
import express = require("express");

export function like_router(pool: Pool): Router {
  const router: Router = express.Router();

  router.get('/get/:id', (req: Request<{ id: number }>, res, next) => { get_likes_handler(req, res, pool, next) })
  router.post('', (req: Request<{ UID: number, PID: number }>, res, next) => { like_handler(req, res, pool, next) });

  return router;
}