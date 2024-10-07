import { IncomingMessage, ServerResponse } from 'http';
import { add_user, get_user_by_id } from './handlers';
import { stringify_body } from './helper';
import { Connection } from 'mysql';
import { readFile } from 'node:fs';

export function greeting_route(req: IncomingMessage, res: ServerResponse): void {
  const index = readFile('./templates/index.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500);
      res.end('No template')
      return;

    }
    return data;
  });
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(index);

}

export function user_routes(req: IncomingMessage, res: ServerResponse, route: Array<string>, sql: Connection): void {
  switch (route[2]) {
    case 'login':
      if (req.method == 'PUT' && route.length == 2) {
        const user = JSON.parse(stringify_body(req));
        add_user(res, user, sql);
      }
      break;

    case 'find':
      if (req.method == 'GET' && route.length == 4) {
        const id: number = Number(route[3]);
        get_user_by_id(res, id, sql);
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
