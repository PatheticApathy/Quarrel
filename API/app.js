var mysql = require('mysql');
var http = require('node:http');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'qapi',
    password: 'ARGS',
    database: 'QuarrelDB'
});
connection.connect();
var sever = http.createServer(function (req, res) {
    if (req.url == '/bob') {
        console.log("been here");
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify('bob'));
    }
});
console.log("Running on localhost:8000");
sever.listen('8000');
