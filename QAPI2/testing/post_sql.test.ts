import { beforeAll, expect, jest, test } from '@jest/globals';
import * as post_sql from '../sql/post';
import '../models.d.ts';
import { createPool } from 'mysql';

const pool = createPool({
  host: 'localhost',
  user: 'qapi',
  password: 'ARGS',
  database: 'QuarrelDB'
});
let UID: number;

test('Get post by id', (done) => {
  post_sql.get_post_by_id(1, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeDefined();
      done();
    }
  });
})
test('get post by id(not exist)', (done) => {
  post_sql.get_post_by_id(100000000, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeUndefined();
      done();
    }
  });
})
test('add post', (done) => {
  let post: Post = {
    PID: 0,
    Comment: "Test",
    Likes: 100000,
    Poster: 1,
    Views: 20,
    Hyperlink: undefined
  }
  post_sql.add_post(post, pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeDefined();
      UID = result!;
      done();
    }
  })
})
//test('get arg by id')
//test('get arg by id (not exist)')
//test('get reply by id')
//test('get reply by id(non exist')
//test('add reply')
test('get random posts', (done) => {
  post_sql.get_rand_posts(pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeDefined();
      done();
    }
  })
})
test('get random arguments', (done) => {
  post_sql.get_rand_args(pool, (err, result) => {
    if (err) {
      done(err);
    } else {
      expect(result).toBeDefined();
      expect(result)
      done();
    }
  })
})


afterAll(() => {
  pool.query("DELETE FROM Post WHERE PID=?", [UID], (err, _bad, _also_bad) => { if (err) { throw err } })
});
