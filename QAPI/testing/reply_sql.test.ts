import { beforeAll, expect, jest, test } from '@jest/globals';
import * as reply_sql from '../sql/replies';
import '../models.d.ts';
import { createPool } from 'mysql';

const pool = createPool({
  host: 'localhost',
  user: 'qapi',
  password: 'ARGS',
  database: 'QuarrelDB'
});
let RID: number;
let ARID: number;
let PRID: number;

test('Get replies for post', (done) => {
  reply_sql.get_replies_post(1, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeDefined();
      done();
    }
  });
});
test('Get replies for arg', (done) => {
  reply_sql.get_replies_args(1, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeDefined();
      done();
    }
  });
});

test('add reply', (done) => {
  let reply: Replies = {
    RID: 0,
    Comment: "Test",
    Likes: 100000,
    Poster: 1,
    Views: 20,
  }

  reply_sql.insert_reply(reply, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeDefined();
      RID = result!;
      done();
    }
  })
});

test('Log post reply', (done) => {
  const transaction: Replies_to_post = {
    PRID: 0,
    post: 1,
    reply: RID
  }

  reply_sql.insert_post_reply(transaction, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeDefined();
      PRID = result!;
      done();
    }
  });
});
test('Log arg reply', (done) => {
  const transaction: Replies_to_args = {
    ARID: 0,
    arg: 1,
    reply: RID
  }

  reply_sql.insert_arg_reply(transaction, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeTruthy();
      ARID = result!;
      done();
    }
  });
});

test('Like reply', (done) => {
  reply_sql.like_reply(RID, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeTruthy();
      done();
    }
  })
});
test('Unlike reply', (done) => {
  reply_sql.unlike_reply(RID, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeTruthy();
      done();
    }
  })
})

//TODO: Make cascades in DB to delete properly
/*
test('Delete post reply', (done) => {
  reply_sql.delete_post_reply(PRID, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeTruthy();
      done();
    }
  })
});
test('Delete arg reply', (done) => {
  reply_sql.delete_arg_reply(ARID, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeTruthy();
      done();
    }
  })
});
*/

afterAll((done) => {
  pool.query("DELETE FROM Replies WHERE RID=?", [RID], (err, _bad, _also_bad) => { if (err) { done(err) } else { done() } })
});
