import { createConnection, Connection } from 'mysql';
import { user_routes, greeting_route } from './routes';
import { createServer, IncomingMessage, ServerResponse } from 'node:http'

const port: String = '8081';

const connection = createConnection({
  host: 'localhost',
  user: 'qapi',
  password: 'ARGS',
  database: 'QuarrelDB'
});

connection.connect();

function route_request(req: IncomingMessage, res: ServerResponse, mysql: Connection): void {
  if (req.url == '/') {
    greeting_route(req, res);
    return
  }
  const route: string[] = req.url!.split('/');
  switch (route[1]) {
    case 'user':
      //get user or add user
      user_routes(req, res, route, mysql);
      break

    default:
      res.writeHead(404);
      res.end("route does not exist yet");
  }
}

const sever = createServer((req, res) => {
  route_request(req, res, connection);
});

console.log(`Running on localhost:${port}`);
sever.listen(port);
