import { beforeAll, expect, jest, test } from '@jest/globals';
import '../models.d.ts'
import * as user_sql from '../sql/user';
import { createPool } from 'mysql';

const pool = createPool({
  host: 'localhost',
  user: 'qapi',
  password: 'ARGS',
  database: 'QuarrelDB'
});

let UID: number;

test('Insert user into DB:', (done) => {
  const user: User = {
    UID: 0,
    Username: "test",
    Password: 'this_is',
    Follow_count: 0
  }
  user_sql.insert_new_user(user, pool, (error, id) => {
    if (error) {
      done(error)
      return;
    }
    UID = id!
    expect(id).toBeDefined();
    done();
    return;
  })

})


test('Get userID with given username and password', (done) => {
  user_sql.get_userid_by_login({ username: 'test', password: 'this_is' }, pool, (err, id) => {
    if (err) {
      done(err)
      return;
    }
    expect(id).toBeDefined();
    done()
    return
  })
});

//test not needed and error prone
//test('Delete User test', (done) => {
//  user_sql.drop_user_by_id(UID, pool, (err, suc) => {
//   if (err) {
//     done(err)
//    return;
//  }
//  expect(suc).toBeTruthy();
//  done()
//  return;
//})
//})
//delete test user from DB 
afterAll(() => {
  pool.query("DELETE FROM User WHERE Username='test'", (err, _bad, _also_bad) => { if (err) { throw err } })
});
