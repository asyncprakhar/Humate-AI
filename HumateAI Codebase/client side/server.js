// const { createServer } = require('https');
// const { parse } = require('url');
// const next = require('next');
// const fs = require('fs');

// // Set NODE_ENV to 'production' if it's not set
// process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// // const options = {
// //   key: fs.readFileSync(''), // write your certificate key here (/etc/letsencrypt/live/yourdomain.com/privkey.pem)
// //   cert: fs.readFileSync(''), // write your certificate here (/etc/letsencrypt/live/yourdomain.com/privkey.pem)
// // };

// app.prepare().then(() => {
//   createServer((req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   }).listen(443, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on https://localhost (${process.env.NODE_ENV} mode)`);
//   });
// });

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Set NODE_ENV to 'production' if it's not set
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 443; // Use the port provided by Render

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port} (${process.env.NODE_ENV} mode)`);
  });
});
