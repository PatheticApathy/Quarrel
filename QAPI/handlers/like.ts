import '../models';
import { Pool, Query } from 'mysql';
import { like_post, unlike_post, get_likes_post, check_existing_like_post, record_user_like_post, remove_user_like_post } from '../sql/sql';
import { Request, Response, NextFunction } from 'express';

export function get_likes_handler_p(req: Request<{ id: number }>, res: Response, sql: Pool, next: NextFunction): void {
  const id: number = req.params.id;
  get_likes_post(id, sql, (err, like) => {
    if (err) {
      next(err);
    }
    else if (!like) {
      res.status(404);
      res.json({ error: "Does not exist" });
    } else {
      res.status(200);
      res.json(like);
    }
  });
};

export function get_liked_posts_handle_p(req: Request<{ UID: number, PIDs: Array<number> }>, res: Response, sql: Pool, next: NextFunction): void {
  const { UID, PIDs } = req.body;

  check_existing_like_post(UID, PIDs, sql, (err, liked_post) => {
    if (err) {
      next(err);
    } else if (!liked_post) {
      res.status(404).json({ error: "User has no liked post" });
    } else {
      res.status(200).json(liked_post);
    }
  });
};

export function post_like_handler_p(req: Request<{ PID: number, UID: number }>, res: Response, sql: Pool, next: NextFunction): void {
  const { PID, UID } = req.body;
  like_post(PID, sql, (err, liked) => {
    if (err) {
      next(err)
    } else if (!liked) {
      res.status(500).json({ error: "Could not like post" });
    } else {
      record_user_like_post(UID, PID, sql, (err, like_transation_reciept) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json({ reciept: like_transation_reciept });
        }
      })
    }
  });
};

export function post_unlike_handler_p(req: Request<{ PID: number, UID: number }>, res: Response, sql: Pool, next: NextFunction): void {
  const { PID, UID } = req.body;
  unlike_post(PID, sql, (err, unliked) => {
    if (err) {
      next(err)
    } else if (!unliked) {
      res.status(500).json({ error: "Could not unlike post" });
    } else {
      remove_user_like_post(UID, PID, sql, (err, complete_message) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json({ message: complete_message });
        }
      })
    }
  });
};
