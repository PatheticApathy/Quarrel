import '../models';
import { OkPacket, Pool } from 'mysql';

export function get_likes_post(id: number, sql: Pool, callback: (err: Error | undefined, likes: Likes | undefined) => void): void {
  sql.query('SELECT Likes FROM Post WHERE PID=?;', id, function (error, result: Array<Likes>, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    } else if (result.length === 0) {
      callback(undefined, undefined);
    } else {
      console.log(`Like ${JSON.stringify(result[0])} retrieved`);
      callback(undefined, result[0]);
    }
  });
};

export function check_existing_like_post(UID: number, PIDs: Array<number>, sql: Pool, callback: (err: Error | undefined, user_liked_posts: Array<{ PID: number }> | undefined) => void): void {
  const query = PIDs.map(() => '?').join(",");
  sql.query(`SELECT PID FROM User_likes WHERE UID = ? AND PID IN (${query}) ;`, [UID, ...PIDs], (error, result: Array<{ PID: number }>) => {
    if (error) {
      console.error('Error checking existing vote:', error);
      callback(error, undefined);
    } else {
      if (result.length === 0) {
        console.log("Users not liked any post ");
        callback(undefined, undefined);
      } else {
        console.log(`User ${UID} has liked posts ${JSON.stringify(result)}`);
        callback(undefined, result);
      }
    }
  });
}

export function like_post(PID: number, sql: Pool, callback: (err: Error | undefined, liked: boolean | undefined) => void): void {
  const query = `UPDATE Post SET Likes = Likes + 1 WHERE PID = ?`;
  sql.query(query, [PID], (error, result: OkPacket) => {
    if (error) {
      console.error('Error updating like count:', error);
      callback(error, undefined);
    } else {
      if (result.affectedRows <= 0) {
        console.error(`Likes not updated for any row`);
        callback(undefined, false);
      } else {
        console.log(`Likes updated for post, ${result.message}`);
        callback(undefined, true);
      }
    };
  });
};

export function unlike_post(PID: number, sql: Pool, callback: (err: Error | undefined, unliked: boolean | undefined) => void): void {
  const query = `UPDATE Post SET Likes = Likes - 1 WHERE PID = ?`;
  sql.query(query, [PID], (error, result: OkPacket) => {
    if (error) {
      console.error('Error updating like count:', error);
      callback(error, undefined);
    } else {
      if (result.affectedRows <= 0) {
        console.error(`Likes not updated for any row`);
        callback(undefined, false);
      } else {
        console.log(`Likes updated for argument, ${result.message}`);
        callback(undefined, true);
      }
    };
  });
};

export function record_user_like_post(UID: number, PID: number, sql: Pool, callback: (err: Error | undefined, id: number | undefined) => void): void {
  const query = `INSERT INTO User_likes (UID, PID) VALUES (?, ?)`;
  sql.query(query, [UID, PID], (error, result: OkPacket) => {
    if (error) {
      console.error('Error recording like:', error);
      callback(error, undefined);
    } else {
      console.log(`Like recorded with ID: ${result.insertId}`);
      callback(undefined, result.insertId);
    }
  });
};

export function remove_user_like_post(UID: number, PID: number, sql: Pool, callback: (err: Error | undefined, result: string | undefined) => void): void {
  const query = `DELETE FROM User_likes WHERE UID = ? AND PID = ?`;
  sql.query(query, [UID, PID], (error, result: OkPacket) => {
    if (error) {
      console.error('Error recording like:', error);
      callback(error, undefined);
    } else {
      console.log(`Like removed for user ${UID} on post ${PID}`);
      callback(undefined, result.message);
    }
  });
};
