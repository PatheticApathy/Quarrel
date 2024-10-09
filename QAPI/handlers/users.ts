import { ServerResponse } from 'http';
import '../models';
import { Pool, Query } from 'mysql';
import { insert_new_user, get_user_by_id, get_user_by_username } from '../sql/sql';

//user based handlers
export function add_user_handler(res: ServerResponse, user: User, sql: Pool): void {
  insert_new_user(user, sql, (err, result) => {
    if (err) {
      res.writeHead(500);
      res.end('Coud not complete transaction');
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  });

};

export function get_id_handler(res: ServerResponse, id: number, sql: Pool): void {
  get_user_by_id(id, sql, (err, user) => {
    if (err) {
      res.writeHead(500);
      res.end('Coud not complete transaction');
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  });

};


export function get_username_handler(res: ServerResponse, username: string, sql: Pool): void {
  get_user_by_username(username, sql, (err, user) => {
    if (err) {
      res.writeHead(500);
      res.end('Coud not complete transaction');
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  });
}
