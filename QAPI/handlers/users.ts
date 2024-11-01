import { genSaltSync, hashSync } from 'bcrypt'
import '../models';
import { Pool } from 'mysql';
import { insert_new_user, get_user_by_id, get_userid_by_login, get_random_users, regex_username } from '../sql/sql';
import { Request, Response, NextFunction } from 'express';

const SALT = "$2a$10$3rG14pYiZyUNs0Z9FfFJ5u";

//user based handlers
export function add_user_handler(req: Request<User>, res: Response<{ UID: number }>, next: NextFunction, sql: Pool): void {
  let user: User = req.body;
  console.log(user);
  user.Password = hashSync(user.Password, SALT);
  user.Follow_count = 0;
  insert_new_user(user, sql, (err, id) => {
    if (err) {
      next(err);
    } else {
      res.status(200);
      res.json({ UID: id! });
    }
  });
};

export function get_id_handler(req: Request<{ id: number }>, res: Response<User | { error: string }>, sql: Pool, next: NextFunction): void {
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

export function post_login_request_handler(req: Request<Login>, res: Response<number | { error: string }>, next: NextFunction, pool: Pool): void {
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
};

export function get_random_users_handler(req: Request, res: Response<Array<User> | { error: string }>, next: NextFunction, pool: Pool) {
  get_random_users(pool, (err, users) => {
    if (err) {
      next(err);
    } else {
      if (!users) {
        res.status(400).json({ error: "No users in database" });
      }
      res.status(200).json(users)
    }
  })
};

export function get_search_handler(req: Request<{ search: string }>, res: Response<Array<User> | { error: string }>, next: NextFunction, pool: Pool) {
  const search_string = req.params.search;
  regex_username(search_string, pool, (err, users) => {
    if (err) {
      next(err);
    } else {
      if (!users) {
        res.status(400).json({ error: "No users in database" });
      }
      res.status(200).json(users);
    }
  });
}
