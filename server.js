const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/api/getLocation', async (req, res) => {
    try {
      const response = await fetch('https://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&key=481EB071-C586-3A91-9DB2-23C53DC4ACA0&crs=EPSG:4019&point=126.7269632,37.4079488&format=json&type=PARCEL&zipcode=false&callback');
      const json = await response.json();
      res.json(json);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '내부 서버 오류' });
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(8080, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:8080');
  });
});