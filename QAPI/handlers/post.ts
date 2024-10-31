import '../models';
import { Pool } from 'mysql';
import { get_post_by_id, add_post, get_arg_by_id, add_argument, get_reply_by_id, add_reply, get_rand_posts, get_rand_args } from '../sql/sql';
import { Response, Request, NextFunction } from 'express';

export function get_post_handler(req: Request<{ id: number }>, res: Response<Post>, next: NextFunction, pool: Pool): void {
  const id: number = req.params.id;
  get_post_by_id(id, pool, (err, post: Post | undefined) => {
    if (err) {
      next(err);
    } else {
      res.status(200);
      res.json(post);
    }
  });
};

export function post_handler(req: Request<Post>, res: Response<number>, next: NextFunction, pool: Pool): void {
  const post: Post = req.params;
  add_post(post, pool, (err, id: number | undefined) => {
    if (err) {
      next(err);
    } else {
      res.status(200);
      res.json(id);
    }
  });
};

export function get_arg_handler(req: Request<{ id: number }>, res: Response<Arguments>, next: NextFunction, pool: Pool): void {
  const id: number = req.params.id;
  get_arg_by_id(id, pool, (err, arg: Arguments | undefined) => {
    if (err) {
      next(err);
    } else {
      res.status(200);
      res.json(arg);
    }
  });
};

export function argument_handler(req: Request<Arguments>, res: Response<number>, next: NextFunction, pool: Pool): void {
  const arg: Arguments = req.params;
  add_argument(arg, pool, (err, id: number | undefined) => {
    if (err) {
      next(err);
    } else {
      res.status(200);
      res.json(id);
    }
  });
};

export function get_reply_handler(req: Request<{ id: number }>, res: Response<Replies>, next: NextFunction, pool: Pool): void {
  const id: number = req.params.id;
  get_reply_by_id(id, pool, (err, reply) => {
    if (err) {
      next(err);
    } else {
      res.status(200);
      res.json(reply);
    }
  });
};

export function reply_handler(req: Request<Replies>, res: Response, next: NextFunction, pool: Pool): void {
  const replies: Replies = req.params;
  add_reply(replies, pool, (err, user) => {
    if (err) {
      next(err);
    } else {
      res.status(200);
      res.json(user);
    }
  });
}

export function get_random_posts_handler(_req: Request, res: Response<Array<Post>>, next: NextFunction, pool: Pool): void {
  get_rand_posts(pool, (err, posts) => {
    if (err) {
      next(err);
    } else {
      res.status(200);
      res.json(posts);
    }
  });
}

export function get_random_args_handler(_req: Request, res: Response<Array<Arguments>>, next: NextFunction, pool: Pool): void {
  get_rand_args(pool, (err, args) => {
    if (err) {
      next(err);
    } else {
      res.status(200);
      res.json(args);
    }
  });
}
