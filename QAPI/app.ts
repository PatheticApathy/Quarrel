import { createPool, Pool } from 'mysql';
import { user_routes, greeting_route, post_routes, vote_routes } from './routes/routes';
import { createServer, IncomingMessage, ServerResponse } from 'node:http'

const port: String = '8081';

const pool = createPool({
  host: 'localhost',
  user: 'qapi',
  password: 'ARGS',
  database: 'QuarrelDB'
});

export function route_request(req: IncomingMessage, res: ServerResponse, mysql: Pool): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('access-control-allow-headers', 'Content-Type, Authorization');
  if (req.url == '/') {
    //TODO: Make greeting screen
    greeting_route(req, res);
    return
  }
  if (req.method == 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }
  const route: string[] = req.url!.split('/');
  switch (route[1]) {
    case 'user':
      //get user or add user
      user_routes(req, res, route, mysql);
      break
    
    case 'post':
      post_routes(req, res, route, mysql);
      break

    case 'vote':
      vote_routes(req, res, route, mysql);
      break

    default:
      res.writeHead(404);
      res.end("route does not exist yet");
  }
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  route_request(req, res, pool);
});

console.log(`Running on localhost:${port}`);
server.listen(port);
