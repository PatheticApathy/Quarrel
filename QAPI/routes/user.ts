import { hash, compare } from 'bcrypt'
import { add_user_handler, get_id_handler } from '../handlers/handlers';
import { stringify_body } from '../helper';
import { Pool } from 'mysql';
import { IncomingMessage, ServerResponse } from 'http';

const saltrounds = 12;

export function user_routes(req: IncomingMessage, res: ServerResponse, route: Array<string>, sql: Pool): void {
  switch (route[2]) {
    case 'signup':
      //validate rest of route and request method and sanatize data
      if (req.method == 'PUT' && route.length == 2) {
        var user: User = JSON.parse(stringify_body(req));
        hash(user.Password, saltrounds, function (err, hash: string) {
          if (err) {
            console.error(`Error, could not hash password: ${err}`);
            throw err;
          }
          user.Password = hash;
          user.Follow_count = 0;
        })
        add_user_handler(res, user, sql);
      } else {
        res.writeHead(404);
        res.end("Not a valid route");
      }
      break;

    case 'login':
      if (req.method == 'GET' && route.length == 2) {
        var user: User = JSON.parse(stringify_body(req));

      } else {
        res.writeHead(404);
        res.end("Not a valid route");
      }
      break

    case 'find':
      if (req.method == 'GET' && route.length == 4) {
        const id: number = Number(route[3]);
        get_id_handler(res, id, sql);
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
