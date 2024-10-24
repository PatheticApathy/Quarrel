import { stringify_body } from '../helper';
import { get_post_handler, post_handler, get_arg_handler, argument_handler, get_reply_handler, reply_handler, get_random_args_handler, get_random_posts_handler } from '../handlers/handlers';
import { Pool } from 'mysql';
import { IncomingMessage, ServerResponse } from 'http';

export function post_routes(req: IncomingMessage, res: ServerResponse, route: Array<string>, sql: Pool): void {
  switch (route[2]) {
    case 'post':
      if (req.method == 'GET' && route.length == 4) {
        if (route[3] == 'batch') {
          get_random_posts_handler(res, sql);
          return;
        }
        const id: number = Number(route[3]);
        get_post_handler(res, id, sql);
        return;

      } else if (req.method == 'POST' && route.length == 3) {
        stringify_body(req, (err, json) => {
          if (err) {
            console.error(`Error could not get http request body: ${err}`);
            res.writeHead(404);
            res.end("Not a valid route");
          }
          try {
            const post: Post = JSON.parse(json!);
            post_handler(res, post, sql);
          }
          catch (error) {
            console.error(`Error, could not parse json: ${error}`);
            res.writeHead(404);
            res.end("Not a valid route");
          }
        })
      } else {
        res.writeHead(404);
        res.end("Not a valid route");
      }
      break;
    case 'args':
      if (req.method == 'GET' && route.length == 4) {
        if (route[3] == 'batch') {
          get_random_args_handler(res, sql);
          return;
        } else {
          const id: number = Number(route[3]);
          get_arg_handler(res, id, sql);
          return;
        }
      } else if (req.method == 'POST' && route.length == 3) {
        stringify_body(req, (err, json) => {
          if (err) {
            console.error(`Error could not get http request body: ${err}`);
            res.writeHead(404);
            res.end("Not a valid route");
          }
          try {
            const arg: Arguments = JSON.parse(json!);
            argument_handler(res, arg, sql);
          }
          catch (error) {
            console.error(`Error, could not parse json: ${error}`);
            res.writeHead(404);
            res.end("Not a valid route");
          }
        })
      } else {
        res.writeHead(404);
        res.end("Not a valid route");
      }
      break;
    case 'replies':
      if (req.method == 'GET' && route.length == 4) {
        const id: number = Number(route[3]);
        get_reply_handler(res, id, sql);
      } else if (req.method == 'POST' && route.length == 3) {
        stringify_body(req, (err, json) => {
          if (err) {
            console.error(`Error could not get http request body: ${err}`);
            res.writeHead(404);
            res.end("Not a valid route");
          }
          try {
            const reply: Replies = JSON.parse(json!);
            reply_handler(res, reply, sql);
          }
          catch (error) {
            console.error(`Error, could not parse json: ${error}`);
            res.writeHead(404);
            res.end("Not a valid route");
          }
        })
      } else {
        res.writeHead(404);
        res.end("Not a valid route");
      }
      break;

    default:
      res.writeHead(404);
      res.end("Not a valid route");
  }
}
