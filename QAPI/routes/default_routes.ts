import { readFile } from 'node:fs';
import { IncomingMessage, ServerResponse } from 'http';

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
