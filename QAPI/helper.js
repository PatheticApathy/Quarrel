"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify_body = stringify_body;
function stringify_body(req) {
    var body = [];
    var parsedbody = '';
    req
        .on('error', function (err) {
        console.error(err);
    })
        .on('data', function (chunk) {
        body.push(chunk);
    })
        .on('end', function () {
        parsedbody = Buffer.concat(body).toString();
    });
    return parsedbody;
}
