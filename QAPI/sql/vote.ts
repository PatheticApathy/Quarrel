import '../models';
import { OkPacket, Pool } from 'mysql';

export function get_vote_by_id(id: number, sql: Pool, callback: (err: Error | undefined, arg: Arguments | undefined) => void): void {
  sql.query('SELECT T1_votes, T2_votes FROM Arguments WHERE AID=?;', id, function (error, result: Arguments, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    }
    console.log(`Vote ${result} retrieved`);
    callback(undefined, result);
  })
};

export function check_existing_vote(UID: number, AID: number, sql: Pool, callback: (err: Error | undefined, hasVoted: boolean | undefined) => void): void {
  const query = `SELECT * FROM User_votes WHERE UID = ? AND AID = ?`;
  sql.query(query, [UID, AID], (error, results) => {
    if (error) {
      console.error('Error checking existing vote:', error);
      callback(error, undefined);
    } else {
      const hasVoted = results.length > 0;
      console.log(`User ${UID} has${hasVoted ? "" : " not"} voted on argument ${AID}`);
      callback(undefined, hasVoted);
    }
  });
}

export function update_votes(AID: number, voteColumn: 'T1_votes' | 'T2_votes', sql: Pool, callback: (err: Error | undefined) => void): void {
  const query = `UPDATE Arguments SET ${voteColumn} = ${voteColumn} + 1 WHERE AID = ?`;
  sql.query(query, [AID], (error, result: OkPacket) => {
    if (error) {
      console.error('Error updating vote count:', error);
      callback(error);
    } else {
      console.log(`Vote updated for argument ${AID} on ${voteColumn}`);
      callback(undefined);
    }
  });
}

export function record_user_vote(UID: number, AID: number, sql: Pool, callback: (err: Error | undefined) => void): void {
  const query = `INSERT INTO User_votes (UID, AID) VALUES (?, ?)`;
  sql.query(query, [UID, AID], (error, result: OkPacket) => {
    if (error) {
      console.error('Error recording vote:', error);
      callback(error);
    } else {
      console.log(`Vote recorded for user ${UID} on argument ${AID}`);
      callback(undefined);
    }
  });
}
