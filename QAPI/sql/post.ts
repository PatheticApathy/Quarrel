import '../models';
import { Pool } from 'mysql';

export function get_post_by_id(id: number, sql: Pool, callback: (err: Error | undefined, post: Post | undefined) => void): void {
  sql.query('SELECT * FROM Post WHERE PID=?;', id, function (error, result: Post, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    }
    console.log(`Post ${result} retrieved`);
    callback(undefined, result);
  })
};

export function add_post(post: Post, sql: Pool, callback: (err: Error | undefined, post: Post | undefined) => void): void {
  sql.query('INSERT INTO Post (Comment, Likes, Views, Poster) VALUES (?, ?, ?, ?)',
  [post.Comment, post.Likes,post.Views,post.Poster], function (error, result: Post, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    }
    console.log(`Post ${result} added`);
    callback(undefined, result);
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

export function add_argument(argument: Arguments, sql: Pool, callback: (err: Error | undefined, argumet: Arguments | undefined) => void): void {
  sql.query('INSERT INTO Arguments (Comment, Likes, Views, Poster, T1_votes, T2_votes) VALUES (?, ?, ?, ?, ?, ?)',
  [argument.Comment, argument.Likes, argument.Views, argument.Poster, argument.T1_votes, argument.T2_votes], function (error, result: Arguments, _) {
      if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
      }
      console.log(`Argument ${result} added`);
      callback(undefined, result);
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