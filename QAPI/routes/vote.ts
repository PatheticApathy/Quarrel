import { stringify_body } from '../helper';
import { get_vote_handler, vote_handler } from '../handlers/handlers';
import { Pool } from 'mysql';
import { IncomingMessage, ServerResponse } from 'http';

export function vote_routes(req: IncomingMessage, res: ServerResponse, route: Array<string>, sql: Pool): void {
  switch (route[2]) {
    case 'vote':
        if(req.method == 'GET' && route.length == 4) {
            const id: number = Number(route[3]);
            get_vote_handler(res, id, sql);
            
        } else if (req.method === 'POST' && route.length === 3) {
          stringify_body(req, (err, json) => {
            if (err) {
              console.error(`Error could not get http request body: ${err}`);
              res.writeHead(500);
              res.end(`Error accessing request body`);
            } else {
              try {
                const voteData: { UID: number, AID: number, voteSide: 'T1' | 'T2' } = JSON.parse(json!);
                vote_handler(res, voteData, sql);
              } catch (error) {
                console.error(`Error, could not parse json: ${error}`);
                res.writeHead(500);
                res.end(`Error parsing json`);
              }
            }
          });
        } else {
          res.writeHead(400);
          res.end("Invalid request method or route");
        }
        break;
  
    default:
      res.writeHead(404);
      res.end("Not a valid route");
  }
}