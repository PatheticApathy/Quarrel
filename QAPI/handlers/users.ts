import { ServerResponse } from 'http';
import '../models';
import { Pool, Query } from 'mysql';
import { insert_new_user, get_user_by_id, get_user_by_username } from '../sql/sql';

//user based handlers
export function add_user_handler(res: ServerResponse, user: User, sql: Pool): void {
  insert_new_user(user, sql, (err, id) => {
    if (err) {
      res.writeHead(500);
      res.end('Could not complete transaction');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(id));
    }
  });

};

export function get_id_handler(res: ServerResponse, id: number, sql: Pool): void {
  get_user_by_id(id, sql, (err, user) => {
    if (err) {
      res.writeHead(500);
      res.end('Could not complete transaction');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  });

};


export function get_user_by_username_handler(res: ServerResponse, login_info: Login, sql: Pool): void {
  get_user_by_username(login_info, sql, (err, user) => {
    if (err) {
      res.writeHead(500);
      res.end('Could not complete transaction/Invalid login');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  });
}
