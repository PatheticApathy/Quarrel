import '../models';
import { OkPacket, Pool } from 'mysql';


export function insert_new_user(user: User, sql: Pool, callback: (err: Error | undefined, id: number | undefined) => void): void {
  sql.query('INSERT INTO User(username,password,follow_count) VALUES (?,?,?);', [user.Username, user.Password, user.Follow_count], function (error, result: OkPacket, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    } else {
      let id = result.insertId;
      console.log(`User ${id} added`);
      callback(undefined, id);
    }
  });
};

export function get_user_by_id(id: number, sql: Pool, callback: (err: Error | undefined, user: User | undefined) => void): void {
  sql.query('SELECT * FROM User WHERE UID=?;', id, function (error, result, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    }
    console.log(`User ${JSON.stringify(result)} retrieved`);
    if (result.length == 0) {
      callback(undefined, undefined);
    } else {
      callback(undefined, result[0]);
    }
  })
};

export function get_userid_by_login(login_info: Login, sql: Pool, callback: (err: Error | undefined, id: number | undefined) => void): void {
  sql.query('SELECT UID FROM User WHERE username=? AND password=?;', [login_info.username, login_info.password], function (error, result: Array<number>, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    }
    else if (result.length == 0) {
      console.log("Invalid login attempt")
      callback(undefined, undefined);
    } else {
      console.log(JSON.stringify(result));
      console.log(`User id: ${result} retrieved`);
      callback(undefined, result[0]);
    }
  })
}

export function drop_user_by_id(id: number, sql: Pool, callback: (err: Error | undefined, success: Boolean) => void): void {
  sql.query('DELETE FROM User WHERE UID=?;', [id], (err, _) => {
    if (err) {
      console.error("Could not delete row:", err);
      callback(err, false);
    }
    console.log(`user ${id} is deleted`);
    callback(undefined, true);
  })
}

export function get_random_users(sql: Pool, callback: (err: Error | undefined, users: Array<User> | undefined) => void): void {
  sql.query('SELECT * FROM User ORDER BY RAND()+1 LIMIT 3;', function (error, result, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    }
    console.log(`User ${JSON.stringify(result)} retrieved`);
    if (result.length == 0) {
      callback(undefined, undefined);
    } else {
      callback(undefined, result);
    }
  })
};
