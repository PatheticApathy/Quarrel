import '../models';
import { OkPacket, Pool } from 'mysql';

export function get_follow_count(id: number, sql: Pool, callback: (err: Error | undefined, user: User | undefined) => void): void {
  sql.query('SELECT Follow_count FROM User WHERE UID=?;', id, function (error, result, _) {
    if (error) {
      console.error('Could not complete transaction:', error);
      callback(error, undefined);
    }
    console.log(`Follow count ${result} retrieved`);
    callback(undefined, result);
  })
};

export function get_followers(UID: number, sql: Pool, callback: (err: Error | undefined, users: Array<User> | undefined) => void): void {
    sql.query('SELECT User.* FROM Follower JOIN User ON Follower.Follows = User.UID WHERE Follower.Influencer = ?;', UID, function (error, result, _) {
        if (error) {
            console.error('Could not complete transaction:', error);
            callback(error, undefined);
        }
        console.log(`Followers ${JSON.stringify(result)} retrieved`);
        callback(undefined, result);
    })
};

export function get_following(UID: number, sql: Pool, callback: (err: Error | undefined, users: Array<User> | undefined) => void): void {
    sql.query('SELECT User.* FROM Follower JOIN User ON Follower.Influencer = User.UID WHERE Follower.Follows = ?;', UID, function (error, result, _) {
        if (error) {
            console.error('Could not complete transaction:', error);
            callback(error, undefined);
        }
        console.log(`Followers ${JSON.stringify(result)} retrieved`);
        callback(undefined, result);
    })
};


export function check_existing_follow(FID: number, IID: number, sql: Pool, callback: (err: Error | undefined, hasfollowed: boolean | undefined) => void): void {
    const query = `SELECT * FROM Follower WHERE Follows = ? AND Influencer = ?;`;
    sql.query(query, [FID, IID], (error, results) => {
        if (error) {
            console.error('Error checking existing vote:', error);
            callback(error, undefined);
        } else {
            const hasfollowed = results.length > 0;
            console.log(`User ${FID} has${hasfollowed ? "" : " not"} followed user ${IID}`);
            callback(undefined, hasfollowed);
        }
    });
}
  
export function follow(UID: number, sql: Pool, callback: (err: Error | undefined) => void): void {
    const query = `UPDATE User SET Follow_count = Follow_count + 1 WHERE UID = ?`;
    sql.query(query, [UID], (error, result: OkPacket) => {
        if (error) {
            console.error('Error updating like count:', error);
            callback(error);
        } else {
            console.log(`Follower count updated for user ${UID}`);
            callback(undefined);
        }
    });
}

export function following(UID: number, sql: Pool, callback: (err: Error | undefined) => void): void {
    const query = `UPDATE User SET Following_count = Following_count + 1 WHERE UID = ?`;
    sql.query(query, [UID], (error, result: OkPacket) => {
        if (error) {
            console.error('Error updating like count:', error);
            callback(error);
        } else {
            console.log(`Follower count updated for user ${UID}`);
            callback(undefined);
        }
    });
}

export function unfollow(UID: number, sql: Pool, callback: (err: Error | undefined) => void): void {
    const query = `UPDATE User SET Follow_count = Follow_count - 1 WHERE UID = ?`;
    sql.query(query, [UID], (error, result: OkPacket) => {
        if (error) {
            console.error('Error updating follower count:', error);
            callback(error);
        } else {
            console.log(`Follow count updated for post ${UID}`);
            callback(undefined);
        }
    });
}

export function unfollowing(UID: number, sql: Pool, callback: (err: Error | undefined) => void): void {
    const query = `UPDATE User SET Following_count = Following_count - 1 WHERE UID = ?`;
    sql.query(query, [UID], (error, result: OkPacket) => {
        if (error) {
            console.error('Error updating like count:', error);
            callback(error);
        } else {
            console.log(`Follower count updated for user ${UID}`);
            callback(undefined);
        }
    });
}
  
export function record_follow(FID: number, IID: number, sql: Pool, callback: (err: Error | undefined) => void): void {
    const query = `INSERT INTO Follower (Follows, Influencer) VALUES (?, ?)`;
    sql.query(query, [FID, IID], (error, result: OkPacket) => {
        if (error) {
            console.error('Error recording like:', error);
            callback(error);
        } else {
            console.log(`Follow recorded for user ${FID} on user ${IID}`);
            callback(undefined);
        }
    });
}

export function remove_follow(FID: number, IID: number, sql: Pool, callback: (err: Error | undefined) => void): void {
    const query = `DELETE FROM Follower WHERE Follows = ? AND Influencer = ?`;
    sql.query(query, [FID, IID], (error, result: OkPacket) => {
        if (error) {
            console.error('Error recording like:', error);
            callback(error);
        } else {
            console.log(`Follow removed for user ${FID} on user ${IID}`);
            callback(undefined);
        }
    });
}