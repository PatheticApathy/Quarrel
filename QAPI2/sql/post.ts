import '../models';
import { MysqlError, OkPacket, Pool, Query } from 'mysql';

export function get_post_by_id(id: number, sql: Pool, callback: (err: Error | undefined, post: Post | undefined) => void): void {
  sql.query('SELECT * FROM Post WHERE PID=?;', id, function (error, result: Array<Post>, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    } else {
      if (result.length === 0) {
        callback(undefined, undefined);
      } else {
        console.log(`Post ${result[0].PID} retrieved`);
        callback(undefined, result[0]);
      }
    }
  })
};

export function add_post(post: Post, sql: Pool, callback: (err: Error | undefined, id: number | undefined) => void): void {
  sql.query('INSERT INTO Post (Comment, Likes, Views, Poster, Hyperlink) VALUES (?, ?, ?, ?, ?)',
    [post.Comment, post.Likes, post.Views, post.Poster, post.Hyperlink], function (error, result: OkPacket, _) {
      if (error) {
        console.error('Could not complete transaction:', error);
        callback(error, undefined);
      }
      console.log(`Post ${result.insertId} added`);
      callback(undefined, result.insertId);
    });
};

export function get_arg_by_id(id: number, sql: Pool, callback: (err: Error | undefined, arg: Arguments | undefined) => void): void {
  sql.query('SELECT * FROM Arguments WHERE AID=?;', id, function (error, result: Arguments, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    }
    console.log(`Argument ${result} retrieved`);
    callback(undefined, result);
  })
};

export function add_argument(argument: Arguments, sql: Pool, callback: (err: Error | undefined, argumet: number | undefined) => void): void {
  sql.query('INSERT INTO Arguments (Comment, Likes, Views, Poster, T1_votes, T2_votes) VALUES (?, ?, ?, ?, ?, ?)',
    [argument.Comment, argument.Likes, argument.Views, argument.Poster, argument.T1_votes, argument.T2_votes], function (error, result: OkPacket, _) {
      if (error) {
        console.error('Could not complete transaction:', error);
        callback(error, undefined);
      }
      console.log(`Argument ${result.insertId} added`);
      callback(undefined, result.insertId);
    });
};

export function get_reply_by_id(id: number, sql: Pool, callback: (err: Error | undefined, replies: Replies | undefined) => void): void {
  sql.query('SELECT * FROM Replies WHERE RID=?;', id, function (error, result: Replies, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    }
    console.log(`Reply ${result} retrieved`);
    callback(undefined, result);
  })
};

export function add_reply(replies: Replies, sql: Pool, callback: (err: Error | undefined, reply: Replies | undefined) => void): void {
  //TODO: Update Replies_args and Replies_post
  sql.query('INSERT INTO Reply (Comment, Likes, Views, Poster) VALUES (?, ?, ?, ?)',
    [replies.Comment, replies.Likes, replies.Views, replies.Poster], function (error, result: Replies, _) {
      if (error) {
        console.error('Could not complete transaction:', error);
        callback(error, undefined);
      }
      console.log(`Post ${result} added`);
      callback(undefined, result);
    });
};

export function get_rand_posts(sql: Pool, callback: (err: Error | undefined, posts: Array<Post> | undefined) => void): void {
  sql.query('SELECT * FROM Post ORDER BY RAND()+1 LIMIT 10;', function (error: MysqlError, result: Array<Post>, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    } else {
      if (result.length === 0) {
        callback(undefined, undefined);
      } else {
        console.log(`Random posts: ${JSON.stringify(result)} retrieved`);
        callback(undefined, result);
      }
    }
  })
};

export function get_rand_args(sql: Pool, callback: (err: Error | undefined, args: Array<Arguments> | undefined) => void): void {
  sql.query('SELECT * FROM Arguments ORDER BY RAND()+1 LIMIT 10;', function (error: MysqlError, result: Array<Arguments>, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    } else {
      if (result.length === 0) {
        callback(undefined, undefined);
      } else {
        console.log(`Random arguments: ${JSON.stringify(result)} retrieved`);
        callback(undefined, result);
      }
    }
  })
};
