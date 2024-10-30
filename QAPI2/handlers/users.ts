import '../models';
import { Pool } from 'mysql';
import { insert_new_user, get_user_by_id, get_userid_by_login } from '../sql/sql';
import { Request, Response, NextFunction } from 'express';

/*user based handlers
export function add_user_handler(res: ServerResponse, user: User, sql: Pool): void {
  insert_new_user(user, sql, (err, id) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Could not complete transaction(user may already exist)' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ UID: id }));
    }
  });
};
*/
export function get_id_handler(req: Request<{ id: number }>, res: Response, sql: Pool, next: NextFunction): void {
  const id: number = req.params.id;
  get_user_by_id(id, sql, (err, user) => {
    if (err) {
      next(err);
    }
    else if (!user) {
      res.status(404);
      res.json({ error: "User does not exist" });
    } else {
      res.status(200);
      res.json(user);
    }
  });
};

/*
export function post_login_request_handler(res: ServerResponse, login_info: Login, sql: Pool): void {
  get_userid_by_login(login_info, sql, (err, id) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Could not complete transaction/Invalid login' }));
    } else if (!id) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: "Invalid Username and Password combination" }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(id));
    }
  });
}
*/
