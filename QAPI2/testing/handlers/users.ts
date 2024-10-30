import { ServerResponse } from 'http';
import '../models';
import { Pool } from 'mysql';
import { insert_new_user, get_user_by_id, get_userid_by_login } from '../sql/sql';

//user based handlers
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

export function get_id_handler(res: ServerResponse, id: number, sql: Pool): void {
  get_user_by_id(id, sql, (err, user) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: `Could not complete transaction: ${err}` }));
    }
    else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: "User does not exist" }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  });
};


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
