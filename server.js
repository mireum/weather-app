const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/api/route', (req, res) => {
    // 여기에 백엔드 로직을 작성
    res.json({ message: 'Hello from the backend!' });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(8080, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:8080');
  });
});