import '../models';
import { Pool } from 'mysql';


export function insert_new_user(user: User, sql: Pool, callback: (err: Error | undefined, id: number | undefined) => void): void {
  sql.query('INSERT INTO User(username,password,follow_count) VALUES (?,?,?);', [user.Username, user.Password, user.Follow_count], function (error, result, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    }
    let id = result.insertID;
    console.log(`User ${id} added`);
    callback(undefined, id);
  });
};

export function get_user_by_id(id: number, sql: Pool, callback: (err: Error | undefined, user: User | undefined) => void): void {
  sql.query('SELECT * FROM User WHERE UID=?;', id, function (error, result: User, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    }
    console.log(`User ${result} retrieved`);
    callback(undefined, result);
  })
};

export function get_user_by_username(login_info: Login, sql: Pool, callback: (err: Error | undefined, user: User | undefined) => void): void {
  sql.query('SELECT * FROM User WHERE username=? AND password=?;', [login_info.username, login_info.Password], function (error, result: User, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    }
    console.log(`User ${result} retrieved`);
    callback(undefined, result);
  })
}
