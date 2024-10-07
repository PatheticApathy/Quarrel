"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greeting_route = greeting_route;
exports.user_routes = user_routes;
var handlers_1 = require("./handlers");
var helper_1 = require("./helper");
var node_fs_1 = require("node:fs");
function greeting_route(req, res) {
    var index = (0, node_fs_1.readFile)('./templates/index.html', 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            res.writeHead(500);
            res.end('No template');
            return;
        }
        return data;
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(index);
}
function user_routes(req, res, route, sql) {
    switch (route[2]) {
        case 'login':
            if (req.method == 'PUT' && route.length == 2) {
                var user = JSON.parse((0, helper_1.stringify_body)(req));
                (0, handlers_1.add_user)(res, user, sql);
            }
            break;
        case 'find':
            if (req.method == 'GET' && route.length == 4) {
                var id = Number(route[3]);
                (0, handlers_1.get_user_by_id)(res, id, sql);
            }
            break;
        case 'update':
            res.writeHead(404);
            res.end("route does not exist yet");
            break;
        default:
            res.writeHead(404);
            res.end("Not a valid route");
    }
}
