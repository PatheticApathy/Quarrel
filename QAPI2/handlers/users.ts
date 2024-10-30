import { genSaltSync, hashSync } from 'bcrypt'
import '../models';
import { Pool } from 'mysql';
import { insert_new_user, get_user_by_id, get_userid_by_login } from '../sql/sql';
import { Request, Response, NextFunction } from 'express';

const SALT = "$2a$10$3rG14pYiZyUNs0Z9FfFJ5u";

//user based handlers
export function add_user_handler(req: Request<User>, res: Response, next: NextFunction, sql: Pool): void {
  let user = req.body;
  user.Password = hashSync(user.Password, SALT);
  user.Follow_count = 0;
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

export function post_login_request_handler(req: Request<Login>, res: Response, next: NextFunction, pool: Pool): void {
  let login: Login = req.body;
  login.password = hashSync(login.password, SALT);
  get_userid_by_login(login, pool, (err, id) => {
    if (err) {
      next(err);
    } else if (!id) {
      res.status(404);
      res.json({ error: "Invalid Username and Password combination" });
    } else {
      res.status(200);
      res.json(id);
    }
  });
}
