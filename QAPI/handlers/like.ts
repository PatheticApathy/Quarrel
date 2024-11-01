import '../models';
import { Pool, Query } from 'mysql';
import { like, unlike, get_likes, check_existing_like, record_user_like, remove_user_like } from '../sql/sql';
import { Request, Response, NextFunction } from 'express';

export function get_likes_handler(req: Request<{ id: number }>, res: Response, sql: Pool, next: NextFunction): void {
  const id: number = req.params.id;
  get_likes(id, sql, (err, like) => {
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

export function like_handler(req: Request<{ UID: number, PID: number}>, res: Response, sql: Pool, next: NextFunction): void {
  const UID = req.body.UID;
  const PID = req.body.PID;

  check_existing_like(UID, PID, sql, (err, hasliked) => {
    if (err) {
        next(err);
    } else if (hasliked) {
        unlike(PID, sql, (err) => {
            if (err) {
              res.status(500);
              res.json({ error: 'Error updating vote' });
            } else {
              remove_user_like(UID, PID, sql, (err) => {
                if (err) {
                  res.status(500);
                  res.json({ error: 'Error recording vote' });
                } else {
                  res.status(200);
                  res.json({ message: 'Vote recorded successfully' });
                }
              })
            }
        })
    } else {
      like(PID, sql, (err) => {
        if (err) {
          next(err);
        } else {
          record_user_like(UID, PID, sql, (err) => {
            if (err) {
              next(err);
            } else {
              res.status(200);
              res.json({ message: 'Like recorded successfully' });
            }
          });
        }
      });
    }
  });
}