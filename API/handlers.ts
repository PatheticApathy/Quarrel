import { ServerResponse } from 'http';
import './models';
import { Connection } from 'mysql';

//user based handlers
export function add_user(res: ServerResponse, user: User, sql: Connection): void {

  sql.query('INSERT INTO User(username,password,follow_count) VALUES ?; SELECT @@IDENTITY;', user, function (error, result: User, _) {
    if (error) {
      res.writeHead(500);
      res.end('Coud not complete transaction')
      throw error;
    }
    console.log(`User ${result} added`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  });

};

export function get_user_by_id(res: ServerResponse, id: number, sql: Connection): void {

  sql.query('SELECT * FROM User WHERE UID=?;', id, function (error, result: User, _) {
    if (error) throw error;
    console.log(`User ${result} retrieved`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  });

};


