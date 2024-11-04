import '../models';
import { OkPacket, Pool } from 'mysql';

export function get_likes(id: number, sql: Pool, callback: (err: Error | undefined, post: Post | undefined) => void): void {
  sql.query('SELECT Likes FROM Post WHERE PID=?;', id, function (error, result: Post, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    }
    console.log(`Like ${result} retrieved`);
    callback(undefined, result);
  })
};

export function check_existing_like(UID: number, PID: number, sql: Pool, callback: (err: Error | undefined, hasliked: boolean | undefined) => void): void {
    const query = `SELECT * FROM User_likes WHERE UID = ? AND PID = ?;`;
    sql.query(query, [UID, PID], (error, results) => {
      if (error) {
        console.error('Error checking existing vote:', error);
        callback(error, undefined);
      } else {
        const hasliked = results.length > 0;
        console.log(`User ${UID} has${hasliked ? "" : " not"} liked post ${PID}`);
        callback(undefined, hasliked);
      }
    });
  }
  
export function like(PID: number, sql: Pool, callback: (err: Error | undefined) => void): void {
    const query = `UPDATE Post SET Likes = Likes + 1 WHERE PID = ?`;
    sql.query(query, [PID], (error, result: OkPacket) => {
    if (error) {
        console.error('Error updating like count:', error);
        callback(error);
    } else {
        console.log(`Likes updated for argument ${PID}`);
        callback(undefined);
    }
});
}

export function unlike(PID: number, sql: Pool, callback: (err: Error | undefined) => void): void {
    const query = `UPDATE Post SET Likes = Likes - 1 WHERE PID = ?`;
    sql.query(query, [PID], (error, result: OkPacket) => {
    if (error) {
        console.error('Error updating like count:', error);
        callback(error);
    } else {
        console.log(`Likes updated for argument ${PID}`);
        callback(undefined);
    }
});
}
  
export function record_user_like(UID: number, PID: number, sql: Pool, callback: (err: Error | undefined) => void): void {
    const query = `INSERT INTO User_likes (UID, PID) VALUES (?, ?)`;
    sql.query(query, [UID, PID], (error, result: OkPacket) => {
    if (error) {
        console.error('Error recording like:', error);
        callback(error);
    } else {
        console.log(`Like recorded for user ${UID} on post ${PID}`);
        callback(undefined);
    }
});
}

export function remove_user_like(UID: number, PID: number, sql: Pool, callback: (err: Error | undefined) => void): void {
    const query = `DELETE FROM User_likes WHERE UID = ? AND PID = ?`;
    sql.query(query, [UID, PID], (error, result: OkPacket) => {
    if (error) {
        console.error('Error recording like:', error);
        callback(error);
    } else {
        console.log(`Like removed for user ${UID} on post ${PID}`);
        callback(undefined);
    }
});
}