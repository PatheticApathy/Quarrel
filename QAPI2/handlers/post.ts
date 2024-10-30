import { ServerResponse } from 'http';
import '../models';
import { Pool, Query } from 'mysql';
import { get_post_by_id, add_post, get_arg_by_id, add_argument, get_reply_by_id, add_reply, get_rand_posts, get_rand_args } from '../sql/sql';
import { Response, Request } from 'express';

/*
//NOTE: NEED to determine if 'batch' or number

export function get_post_handler(res: ): void {
  get_post_by_id(id, sql, (err, post: Post | undefined) => {
    if (err) {
      res.writeHead(500);
      res.end('Coud not complete transaction');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(post));
    }
  });
};

export function post_handler(res: ServerResponse, post: Post, sql: Pool): void {
  add_post(post, sql, (err, id: number | undefined) => {
    if (err) {
      res.writeHead(500);
      console.error(`Error: ${err}`);
      res.end({ error: err });
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(id));
    }
  });
};

export function get_arg_handler(res: ServerResponse, id: number, sql: Pool): void {
  get_arg_by_id(id, sql, (err, arg: Arguments | undefined) => {
    if (err) {
      res.writeHead(500);
      res.end('Coud not complete transaction');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(arg));
    }
  });
};

export function argument_handler(res: ServerResponse, arg: Arguments, sql: Pool): void {
  add_argument(arg, sql, (err, id: number | undefined) => {
    if (err) {
      res.writeHead(500);
      res.end('Coud not complete transaction');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(id));
    }
  });
};

export function get_reply_handler(res: ServerResponse, id: number, sql: Pool): void {
  get_reply_by_id(id, sql, (err, post) => {
    if (err) {
      res.writeHead(500);
      res.end('Coud not complete transaction');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(post));
    }
  });
};

export function reply_handler(res: ServerResponse, replies: Replies, sql: Pool): void {
  add_reply(replies, sql, (err, user) => {
    if (err) {
      res.writeHead(500);
      res.end('Coud not complete transaction');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  });
}

export function get_random_posts_handler(res: ServerResponse, sql: Pool): void {
  get_rand_posts(sql, (err, posts) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(posts));
    }
  });
}

export function get_random_args_handler(res: ServerResponse, sql: Pool): void {
  get_rand_args(sql, (err, args) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(args));
    }
  });
}
*/
