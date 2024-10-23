import { ServerResponse } from 'http';
import '../models';
import { Pool, Query } from 'mysql';
import { get_vote_by_id, check_existing_vote, update_votes, record_user_vote } from '../sql/sql';

export function get_vote_handler(res: ServerResponse, id: number, sql: Pool): void {
  get_vote_by_id(id, sql, (err, post) => {
    if (err) {
      res.writeHead(500);
      res.end('Coud not complete transaction');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify(post));
    }
  });
};

export function vote_handler(res: ServerResponse, voteData: { UID: number, AID: number, voteSide: 'T1' | 'T2' }, sql: Pool): void {
  const voteColumn = voteData.voteSide === 'T1' ? 'T1_votes' : 'T2_votes';

  check_existing_vote(voteData.UID, voteData.AID, sql, (err, hasVoted) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Error checking vote' }));
    } else if (hasVoted) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'User has already voted on this argument' }));
    } else {
      update_votes(voteData.AID, voteColumn, sql, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Error updating vote' }));
        } else {
          record_user_vote(voteData.UID, voteData.AID, sql, (err) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Error recording vote' }));
            } else {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'Vote recorded successfully' }));
            }
          });
        }
      });
    }
  });
}