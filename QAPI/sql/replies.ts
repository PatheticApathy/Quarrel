import '../models';
import { OkPacket, Pool } from 'mysql';

export function get_replies_post(PID: number, sql: Pool, callback: (err: Error | undefined, replies: Array<Replies> | undefined) => void) {
  sql.query(
    `
    SELECT r.RID, r.Poster, r.Likes, r.Views, r.Comment
    FROM Replies r
    JOIN Replies_to_post rp ON rp.reply = r.RID
    JOIN Post p ON rp.post = p.PID
    WHERE p.PID = ?;
    `,
    PID,
    (err, results: Array<Replies> | undefined) => {
      if (err) {
        console.error(`Error could not complete transaction: ${err}`);
        callback(err, undefined);
      } else if (results?.length == 0) {
        console.log("No replies found");
        callback(undefined, undefined);
      } else {
        console.log(`Post ${PID} has replies ${JSON.stringify(results)}`)
        callback(undefined, results);
      }
    }
  );
}

export function get_replies_args(AID: number, sql: Pool, callback: (err: Error | undefined, replies: Array<Replies> | undefined) => void) {
  sql.query(
    `
    SELECT r.RID, r.Poster, r.Likes, r.Views, r.Comment
    FROM Replies r
    JOIN Replies_to_args ra ON ra.reply = r.RID
    JOIN Arguments a ON ra.arg = a.AID
    WHERE a.AID = ?;
    `,
    AID,
    (err, results: Array<Replies> | undefined) => {
      if (err) {
        console.error(`Error could not complete transaction: ${err}`);
        callback(err, undefined);
      } else if (results?.length == 0) {
        console.log("No replies found");
        callback(undefined, undefined);
      } else {
        console.log(`Argument ${AID} has replies ${JSON.stringify(results)}`)
        callback(undefined, results);
      }
    }
  );
}

export function insert_reply(reply: Replies, sql: Pool, callback: (err: Error | undefined, RID: number | undefined) => void) {
  sql.query('INSERT INTO Replies(Comment,Views,Likes,Poster) VALUES (?,?,?,?)', [reply.Comment, reply.Views, reply.Likes, reply.Poster], (err, result: OkPacket) => {
    if (err) {
      console.error('Could not complete transaction')
      callback(err, undefined);
    } else {
      const RID = result.insertId;
      console.log(`Reply ${RID} created`);
      callback(undefined, RID);
    }
  });
}

export function insert_post_reply(transac: Replies_to_post, sql: Pool, callback: (err: Error | undefined, receipt_id: number | undefined) => void) {
  sql.query('INSERT INTO Replies_to_post(reply, post) VALUES (?,?)', [transac.reply, transac.post], (err, result: OkPacket) => {
    if (err) {
      console.error(`Could not verify reply status: ${err}`);
      callback(err, undefined)
    } else {
      const PRID = result.insertId;
      console.log(`Reply has been created with id: ${PRID}`);
      callback(undefined, PRID);
    }
  });
}
export function insert_arg_reply(transac: Replies_to_args, sql: Pool, callback: (err: Error | undefined, receipt_id: number | undefined) => void) {
  sql.query('INSERT INTO Replies_to_post(reply, post) VALUES (?,?)', [transac.reply, transac.arg], (err, result: OkPacket) => {
    if (err) {
      console.error(`Could not verify reply status: ${err}`);
      callback(err, undefined)
    } else {
      const ARID = result.insertId;
      console.log(`Reply has been created with id: ${ARID}`);
      callback(undefined, ARID);
    }
  });
}

export function delete_reply(RID: number, sql: Pool, callback: (err: Error | undefined, deleted: boolean | undefined) => void) {
  sql.query('DELETE FROM Replies WHERE RID=?', RID, (err, result: OkPacket) => {
    if (err) {
      console.error(`Could not verify reply status: ${err}`);
      callback(err, undefined)
    } else if (result.affectedRows <= 0) {
      console.error('No rows deleted');
      callback(undefined, false);
    } else {
      console.log(`Reply ${RID} deleted`);
      callback(undefined, true);
    }
  });
}

export function like_reply(RID: number, sql: Pool, callback: (err: Error | undefined, liked: boolean | undefined) => void) {
  sql.query('UPDATE Replies SET Likes = Likes + 1 WHERE RID = ?', RID, (err, result: OkPacket) => {
    if (err) {
      console.error(`Could not like reply: ${err}`);
      callback(err, undefined);
    } else if (result.changedRows <= 0) {
      console.error(`No likes added for reply: ${RID}`)
      callback(undefined, false);
    } else {
      console.log(`Like added for reply: ${RID}`)
      callback(undefined, true);
    }
  });
}
export function unlike_reply(RID: number, sql: Pool, callback: (err: Error | undefined, unliked: boolean | undefined) => void) {
  sql.query('UPDATE Replies SET Likes = Likes - 1 WHERE RID = ?', RID, (err, result: OkPacket) => {
    if (err) {
      console.error(`Could not unlike reply: ${err}`);
      callback(err, undefined);
    } else if (result.changedRows <= 0) {
      console.error(`No likes subtracted for reply: ${RID}`)
      callback(undefined, false);
    } else {
      console.log(`Like subtracted for reply: ${RID}`)
      callback(undefined, true);
    }
  });
}

export function get_replies_count_for_posts(PIDs: Array<{ PID: number }>, sql: Pool, callback: (err: Error | undefined, replies: Array<{ PID: number, reply_count: number }> | undefined) => void) {
  const query = PIDs.map(() => '?').join(",");
  const array = PIDs.map((PID) => PID.PID);
  sql.query(
    `
    SELECT p.PID, COUNT(r.RID) AS reply_count
    FROM Replies r
    JOIN Replies_to_post rp ON rp.reply = r.RID
    JOIN Post p ON rp.post = p.PID
    WHERE p.PID IN (${query});
    `,
    array,
    (err, results: Array<{ PID: number, reply_count: number }> | undefined) => {
      if (err) {
        console.error(`Error could not complete transaction: ${err}`);
        callback(err, undefined);
      } else if (results?.length == 0) {
        console.log("No replies found");
        callback(undefined, undefined);
      } else {
        console.log(`Post reply counts fetched ${JSON.stringify(results)}`)
        callback(undefined, results);
      }
    }
  );
}

export function get_replies_count_for_args(AIDs: Array<{ AID: number }>, sql: Pool, callback: (err: Error | undefined, replies: Array<{ AID: number, reply_count: number }> | undefined) => void) {
  const query = AIDs.map(() => '?').join(",");
  const array = AIDs.map((AID) => AID.AID);
  sql.query(
    `
    SELECT a.AID, COUNT(r.RID) AS reply_count
    FROM Replies r
    JOIN Replies_to_args ra ON ra.reply = r.RID
    JOIN Arguments a ON ra.arg = a.AID
    WHERE a.AID IN (${query});
    `,
    array,
    (err, results: Array<{ AID: number, reply_count: number }> | undefined) => {
      if (err) {
        console.error(`Error could not complete transaction: ${err}`);
        callback(err, undefined);
      } else if (results?.length == 0) {
        console.log("No replies found");
        callback(undefined, undefined);
      } else {
        console.log(`Post reply counts fetched ${JSON.stringify(results)}`)
        callback(undefined, results);
      }
    }
  );
}
