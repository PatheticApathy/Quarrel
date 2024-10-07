"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_user = add_user;
exports.get_user_by_id = get_user_by_id;
require("./models");
//user based handlers
function add_user(res, user, sql) {
    sql.query('INSERT INTO User(username,password,follow_count) VALUES ?; SELECT @@IDENTITY;', user, function (error, result, _) {
        if (error) {
            res.writeHead(500);
            res.end('Coud not complete transaction');
            throw error;
        }
        console.log("User ".concat(result, " added"));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
    });
}
;
function get_user_by_id(res, id, sql) {
    sql.query('SELECT * FROM User WHERE UID=?;', id, function (error, result, _) {
        if (error)
            throw error;
        console.log("User ".concat(result, " retrieved"));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
    });
}
;
