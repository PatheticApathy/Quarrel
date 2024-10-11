
//TODO: make services
if (req.method == 'GET') {
    connection.query('SELECT * FROM User', function (error, results, fields) {
        if (error) throw error;
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify(results));
      });
}

import '../models';
import { ServerResponse } from 'http';
import { Connection } from 'mysql';

export function get_user_by_id(res: ServerResponse, id: number, sql: Connection): void {
  sql.query('SELECT * FROM User WHERE UID = ?', [id], function (error, result) {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Database query error' }));
      throw error;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result[0] || {}));
  });
}

export function register_user(res: ServerResponse, userData: User, sql: Connection): void {
  const { Username, Password } = userData;
  sql.query(
    'INSERT INTO User (Username, Password) VALUES (?, ?)',
    [Username, Password],
    function (error, result) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'User registration failed' }));
        throw error;
      }

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User registered', UID: result.UID }));
    }
  );
}

export function login_user(res: ServerResponse, Username: string, Password: string, sql: Connection): void {
  sql.query(
    'SELECT * FROM User WHERE Username = ? AND Password = ?',
    [Username, Password],
    function (error, result) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Database query error' }));
        throw error;
      }

      if (result.length === 0) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid credentials' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Login successful', user: result[0] }));
      }
    }
  );
}

export function update_user_profile(res: ServerResponse, UID: number, updatedData: Partial<User>, sql: Connection): void {
  const { Username, Password } = updatedData;
  sql.query(
    'UPDATE User SET Username = ?, Password = ? WHERE UID = ?',
    [Username, Password, UID],
    function (error, result) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'User update failed' }));
        throw error;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User updated' }));
    }
  );
}

export function delete_user(res: ServerResponse, UID: number, sql: Connection): void {
  sql.query('DELETE FROM User WHERE UID = ?', [UID], function (error, result) {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'User deletion failed' }));
      throw error;
    }

    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end();
  });
}

export function follow_user(res: ServerResponse, Follows: number, Influencer: number, sql: Connection): void {
  sql.query(
    'INSERT INTO Follower (Follows, Influencer) VALUES (?, ?)',
    [Follows, Influencer],
    function (error, result) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to follow user' }));
        throw error;
      }
      sql.query(
        'UPDATE User SET Follow_count = Follow_count + 1 WHERE UID = ?',
        [Influencer],
        function (error, result) {
          if (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to update follow count' }));
            throw error;
          }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${Follows} followed user ${Influencer}` }));
        }
      );
    }
  );
}

export function unfollow_user(res: ServerResponse, Follows: number, Influencer: number, sql: Connection): void {
  sql.query(
    'DELETE FROM Follower WHERE Follows = ? AND Influencer = ?',
    [Follows, Influencer],
    function (error, result) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to unfollow user' }));
        throw error;
      }
      sql.query(
        'UPDATE User SET Follow_count = Follow_count - 1 WHERE UID = ?',
        [Influencer],
        function (error, result) {
          if (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to update follow count' }));
            throw error;
          }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${Follows} unfollowed user ${Influencer}` }));
        }
      );
    }
  );
}

export function post(res: ServerResponse, Comment: string, Poster: number, sql: Connection): void {
  sql.query(
    'INSERT INTO Post (Comment, Likes, Views, Poster) VALUES (?, 0, 0, ?)',
    [Comment, Poster],
    function (error, result) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to add post' }));
        throw error;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${Poster} posted ${Comment}` }));
        }
  );
}

export function argument(res: ServerResponse, Comment: string, Poster: number, sql: Connection): void {
  sql.query(
    'INSERT INTO Arguments (Comment, Likes, Views, Poster, T1_votes, T2_votes) VALUES (?, 0, 0, ?, 0, 0)',
    [Comment, Poster],
    function (error, result) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to add argument' }));
        throw error;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${Poster} posted argument ${Comment}` }));
        }
  );
}

export function reply(res: ServerResponse, Comment: string, Poster: number, sql: Connection): void {
  sql.query(
    'INSERT INTO Replies (Comment, Likes, Views, Poster) VALUES (?, 0, 0, ?)',
    [Comment, Poster],
    function (error, result) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to add reply' }));
        throw error;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${Poster} replied ${Comment}` }));
        }
  );
}

export function like(res: ServerResponse, User: number, PID: number, sql: Connection): void {
  sql.query(
    'UPDATE Post SET Likes = Likes + 1 WHERE PID = ?',
    [PID],
    function (error, result) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to follow user' }));
        throw error;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${User} liked post ${PID}` }));
        }
  );
}

export function get_argument(res: ServerResponse, id: number, sql: Connection): void {
  sql.query('SELECT * FROM Arguments WHERE AID = ?', [id], function (error, result) {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Database query error' }));
      throw error;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result[0] || {}));
  });
}

export function get_post(res: ServerResponse, id: number, sql: Connection): void {
  sql.query('SELECT * FROM Post WHERE PID = ?', [id], function (error, result) {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Database query error' }));
      throw error;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result[0] || {}));
  });
}

export function get_reply(res: ServerResponse, id: number, sql: Connection): void {
  sql.query('SELECT * FROM Replies WHERE RID = ?', [id], function (error, result) {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Database query error' }));
      throw error;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result[0] || {}));
  });
}