# Nodejs

Node js is probably the most known JS runtime

## Node http server basics

A simple http server can be created using **HTTP/2** library

```JavaScript
const http = require('node:http2');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

`req` = _http_request_
`res` = _http_response_

## request properties

For our purposes there are 4 main parts of a httprequest
the type is `ReadableStream`
Documentation of methods can be found on nodejs

- method and url both on the first line of an http request,
  method is the type of request

  - GET: not changing info, standard type of request
  - POST: change info on website
  - PUT: not supported by web browser, use to update info
  - DELETE: not supported by web browser, used to specify deletion on website

  The URI/URL is the identifier for the webpage to fetch(anything after the hostname and port)
  ex. dumbwebsite.com/blah blah would be the uri

- headers: general info about the device, or additional info about the request I.E type of device, time of request, etc

- Body: the information the request wants to share I.E json data or form data

With that in mind,

```JavaScript
//to get method and url/uri
const { method, url } = request;

// for headers (notice it is a dictionary)
const { headers } = request;
const userAgent = headers['user-agent'];
```

The body is what we want the body is only relevant with a `POST` or `PUT` request
The body is just a buffer of bytes that we can covert into a string

```JavaScript
let body = [];
  //The body is sent to a byte buffer
  .on('data', chunk => {
    body.push(chunk);
  })
  .on('end', () => {
    body = Buffer.concat(body).toString();
    // at this point, `body` has the entire request body stored in it as a string
  });
```

> NOTE!
> Errors will occur and should be properly handled. Possible errors can be found on the documentation

## response properties

Response is a `WritableStream` and `EventEmitter`

Has serveral methods to set the header and create a body
Documentation can found on nodejs

## More here

- [https://nodejs.org/en/learn/modules/anatomy-of-an-http-transaction]
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview]
