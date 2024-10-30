import { IncomingMessage } from "http";

export function stringify_body(req: IncomingMessage, callback: (err: Error | undefined, data: string | undefined) => void): void {
  var body: Array<Buffer> = [];
  req
    .on('error', err => {
      console.error(err);
      callback(err, undefined)
    })
    .on('data', (chunk: Buffer) => {
      body.push(chunk);
    })
    .on('end', () => {
      callback(undefined, Buffer.concat(body).toString());
    })
}
