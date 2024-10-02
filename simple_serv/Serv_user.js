var http = require('node:http');
var user = {
    UID: 0,
    name: "Alice",
    username: "Adog",
    password: "1234",
    follow_count: 0
};
// basic server
var serv = http.createServer(function (_req, res) {
    res.writeHead(200, { 'Content-Type': 'application / json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify(user));
});
console.log("Running on localhost:8000");
serv.listen(8000);
