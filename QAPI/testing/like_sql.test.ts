import { beforeAll, expect, jest, test } from '@jest/globals';
import * as like_sql from '../sql/like';
import '../models.d.ts';
import { createPool } from 'mysql';

const pool = createPool({
  host: 'localhost',
  user: 'qapi',
  password: 'ARGS',
  database: 'QuarrelDB'
});

test('Get likes of post', (done) => {
  like_sql.get_likes_post(1, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeDefined();
      expect(typeof result?.Likes).toBe(typeof 1);
      done();
    }
  });
});
test('Get likes of post(Not exist)', (done) => {
  like_sql.get_likes_post(100000000, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeUndefined();
      done();
    }
  });
});


test('like a post', (done) => {
  const PID = 1
  like_sql.like_post(PID, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeTruthy();
      done();
    }
  })
})
test('unlike a post', (done) => {
  const PID = 1
  like_sql.like_post(PID, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeTruthy();
      done();
    }
  })
});

test('Record like transaction', (done) => {
  like_sql.record_user_like_post(1, 1, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeDefined()
      expect(typeof result).toBe(typeof 1);
      done();
    }
  })
});

test('Get user genrated likes for the given list of post', (done) => {
  like_sql.check_existing_like_post(1, [1, 2, 3], pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeDefined();
      done();
    }
  });
});

test('Remove like transaction', (done) => {
  like_sql.remove_user_like_post(1, 1, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeDefined()
      expect(typeof result).toBe(typeof "blah blah");
      done();
    }
  })
});
