import { get_vote_handler, vote_handler } from '../handlers/handlers';
import { Pool } from 'mysql';
import { Router, Response, Request } from 'express';
import express = require("express");

export function vote_router(pool: Pool): Router {
  const router: Router = express.Router();

  router.get('/vote/:id', (req: Request<{ id: number }>, res, next) => { get_vote_handler(req, res, pool, next) });
  router.post('/vote', (req: Request<{ UID: number, AID: number, voteSide: 'T1' | 'T2' }>, res, next) => { vote_handler(req, res, pool, next) });
  
  return router;
}



