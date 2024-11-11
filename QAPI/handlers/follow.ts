import '../models';
import { Pool, Query } from 'mysql';
import { get_follow_count, get_followers, get_following, check_existing_follow, follow, following, unfollow, unfollowing, record_follow, remove_follow } from '../sql/sql';
import { Request, Response, NextFunction } from 'express';

export function get_follow_count_handler(req: Request<{ id: number }>, res: Response, sql: Pool, next: NextFunction): void {
  const id: number = req.params.id;
  get_follow_count(id, sql, (err, follow) => {
    if (err) {
      next(err);
    }
    else if (!follow) {
      res.status(404);
      res.json({ error: "Does not exist" });
    } else {
      res.status(200);
      res.json(follow);
    }
  });
};

export function get_followers_handler(req: Request<{ id: number }>, res: Response<Array<User> | { error: string }>, sql: Pool, next: NextFunction): void {
    const id: number = req.params.id;
    get_followers(id, sql, (err, follow) => {
      if (err) {
        next(err);
      } else {
        if (!follow) {
          res.status(400).json({ error: "No users in database" });
        }
        res.status(200).json(follow)
      }
    });
};

export function get_following_handler(req: Request<{ id: number }>, res: Response<Array<User> | { error: string }>, sql: Pool, next: NextFunction): void {
    const id: number = req.params.id;
    get_following(id, sql, (err, follow) => {
        if (err) {
            next(err);
        }
        else if (!follow) {
            res.status(404);
            res.json({ error: "Does not exist" });
        } else {
            res.status(200);
            res.json(follow);
        }
    });
};

export function follow_handler(req: Request<{ FID: number, IID: number}>, res: Response, sql: Pool, next: NextFunction): void {
  const FID = req.body.FID;
  const IID = req.body.IID;

  check_existing_follow(FID, IID, sql, (err, hasliked) => {
    if (err) {
        next(err);
    } else if (hasliked) {
        unfollow(IID, sql, (err) => {
            if (err) {
              res.status(500);
              res.json({ error: 'Error updating follow' });
            } else {
              remove_follow(FID, IID, sql, (err) => {
                if (err) {
                  res.status(500);
                  res.json({ error: 'Error removing follow' });
                } else {
                  unfollowing(FID, sql, (err) => {
                    if (err) {
                      res.status(500);
                      res.json({ error: 'Error removing follow' });
                    } else {
                      res.status(200);
                      res.json({ message: 'Follow removed successfully' });
                    }
                  })
                }
              })
            }
        })
    } else {
      follow(IID, sql, (err) => {
        if (err) {
          next(err);
        } else {
          record_follow(FID, IID, sql, (err) => {
            if (err) {
              next(err);
            } else {
              following(FID, sql, (err) => {
                if (err) {
                  next(err);
                } else {
                  res.status(200);
                  res.json({ message: 'Follow recorded successfully' });
                }
            })
          }
          });
        }
      });
    }
  });
}