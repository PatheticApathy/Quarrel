"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = require("mysql");
var routes_1 = require("./routes");
var node_http_1 = require("node:http");
var port = '8081';
var connection = (0, mysql_1.createConnection)({
    host: 'localhost',
    user: 'qapi',
    password: 'ARGS',
    database: 'QuarrelDB'
});
connection.connect();
function route_request(req, res, mysql) {
    if (req.url == '/') {
        (0, routes_1.greeting_route)(req, res);
        return;
    }
    var route = req.url.split('/');
    switch (route[1]) {
        case 'user':
            //get user or add user
            (0, routes_1.user_routes)(req, res, route, mysql);
            break;
        default:
            res.writeHead(404);
            res.end("route does not exist yet");
    }
}
var sever = (0, node_http_1.createServer)(function (req, res) {
    route_request(req, res, connection);
});
console.log("Running on localhost:".concat(port));
sever.listen(port);
