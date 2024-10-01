const http = require('node:http');

interface User {
  UID: number,
  name: string,
  username: string,
  password: string,
  follow_count: number
}

const user: User = {
  UID: 0,
  name: "Alice",
  username: "Adog",
  password: "1234",
  follow_count: 0
}
// basic server
const serv = http.createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'application / json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(user));
});

console.log("Running on localhost:8000")
serv.listen(8000);


