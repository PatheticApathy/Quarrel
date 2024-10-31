import '../models';
import { Pool, Query } from 'mysql';
import { get_post_by_id, add_post, get_arg_by_id, add_argument, get_reply_by_id, add_reply, get_rand_posts, get_rand_args } from '../sql/sql';
import { Response, Request, NextFunction } from 'express';

//NOTE: NEED to determine if 'batch' or number

export function get_post_handler(req: Request<{ id: number }>, res: Response, sql: Pool, next: NextFunction): void {
  const id: number = req.params.id;
  get_post_by_id(id, sql, (err, post: Post | undefined) => {
    if (err) {
      next(err);
    } else if (!id) {
      res.status(404);
      res.json({ error: "Post does not exist" });
    } else {
      res.status(200);
      res.json(id);
    }
  });
};

export function post_handler(req: Request<Post>, res: Response, sql: Pool, next: NextFunction): void {
  let post: Post = req.body;
  post.Likes = 0;
  post.Views = 0;
  add_post(post, sql, (err, id: number | undefined) => {
    if (err) {
      next(err);
    } else {
      res.status(200);
      res.json(id);
    }
  });
};

export function get_arg_handler(req: Request<{ id: number }>, res: Response, sql: Pool, next: NextFunction): void {
  const id: number = req.params.id;
  get_arg_by_id(id, sql, (err, arg: Arguments | undefined) => {
    if (err) {
      next(err);
    } else if (!id) {
      res.status(404);
      res.json({ error: "Argument does not exist" });
    } else {
      res.status(200);
      res.json(id);
    }
  });
};

export function argument_handler(req: Request<Arguments>, res: Response, sql: Pool, next: NextFunction): void {
  let arg: Arguments = req.body;
  add_argument(arg, sql, (err, id: number | undefined) => {
    if (err) {
      next(err);
    } else {
      res.status(200);
      res.json(id);
    }
  });
};

export function get_reply_handler(req: Request<{ id: number }>, res: Response, sql: Pool, next: NextFunction): void {
  const id: number = req.params.id;
  get_reply_by_id(id, sql, (err, post) => {
    if (err) {
      next(err);
    } else if (!id) {
      res.status(404);
      res.json({ error: "Reply does not exist" });
    } else {
      res.status(200);
      res.json(id);
    }
  });
};

export function reply_handler(req: Request<Replies>, res: Response, sql: Pool, next: NextFunction): void {
  let replies: Replies = req.body;
  add_reply(replies, sql, (err, id: number | undefined) => {
    if (err) {
      next(err);
    } else {
      res.status(200);
      res.json(id);
    }
  });
}

export function get_random_posts_handler(res: Response, sql: Pool, next: NextFunction): void {
  get_rand_posts(sql, (err, posts) => {
    if (err) {
      next(err);
    } else {
      res.status(200);
      res.json(posts);
    }
  });
}

export function get_random_args_handler(res: Response, sql: Pool, next: NextFunction): void {
  get_rand_args(sql, (err, args) => {
    if (err) {
      next(err);
    } else {
      res.status(200);
      res.json(args);
    }
  });
}
