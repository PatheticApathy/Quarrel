import { IncomingMessage } from "http";

export function stringify_body(req: IncomingMessage): string {
  var body: Array<Buffer> = [];
  var parsedbody: string = '';
  req
    .on('error', err => {
      console.error(err);
    })
    .on('data', (chunk: Buffer) => {
      body.push(chunk);
    })
    .on('end', () => {
      parsedbody = Buffer.concat(body).toString();
    })

  return parsedbody;

}
