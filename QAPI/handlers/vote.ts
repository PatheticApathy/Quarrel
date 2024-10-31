import '../models';
import { Pool, Query } from 'mysql';
import { get_vote_by_id, check_existing_vote, update_votes, record_user_vote } from '../sql/sql';
import { Request, Response, NextFunction } from 'express';

export function get_vote_handler(req: Request<{ id: number }>, res: Response, sql: Pool, next: NextFunction): void {
  const id: number = req.params.id;
  get_vote_by_id(id, sql, (err, vote) => {
    if (err) {
      next(err);
    }
    else if (!vote) {
      res.status(404);
      res.json({ error: "Vote does not exist" });
    } else {
      res.status(200);
      res.json(vote);
    }
  });
};

export function vote_handler(req: Request<{ UID: number, AID: number, voteSide: 'T1' | 'T2' }>, res: Response, sql: Pool, next: NextFunction): void {
  const UID = req.body.UID;
  const AID = req.body.AID;
  const voteSide = req.body.voteSide === 'T1' ? 'T1_votes' : 'T2_votes';

  check_existing_vote(UID, AID, sql, (err, hasVoted) => {
    if (err) {
      next(err);
    } else if (hasVoted) {
      res.status(400);
      res.json({ error: "User has already voted" });
    } else {
      update_votes(AID, voteSide, sql, (err) => {
        if (err) {
          res.status(500);
          res.json({ error: 'Error updating vote' });
        } else {
          record_user_vote(UID, AID, sql, (err) => {
            if (err) {
              res.status(500);
              res.json({ error: 'Error recording vote' });
            } else {
              res.status(200);
              res.json({ message: 'Vote recorded successfully' });
            }
          });
        }
      });
    }
  });
}