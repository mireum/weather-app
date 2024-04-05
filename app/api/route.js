const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express().router;

  server.use(bodyParser.json());
  
  server.post('/getLocation', async (req, res) => {
    try {
      const apiKey = '481EB071-C586-3A91-9DB2-23C53DC4ACA0';
      const crs = 'EPSG:4019';
      const point = `${req.body.lng},${req.body.lat}`;
      const format = 'json';
      const type = 'PARCEL';
      const zipcode = 'false';
      const apiUrl = `https://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&key=${apiKey}&crs=${crs}&point=${point}&format=${format}&type=${type}&zipcode=${zipcode}&errorFormat=json&callback`;
      const response = await fetch(apiUrl);
      const json = await response.json();
      res.json(json);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '내부 서버 오류' });
    }
  });

  server.post('/getDust', async (req, res) => {
    try {
      const location = req.body.sido;
      let sido;
      if (location[0] === '서') {sido = '서울'}
      else if (location[0] === '인') {sido = '인천'}
      else if (location[0] === '부') {sido = '부산'}
      else if (location[0] === '경') {sido = '경기'}
      else if (location[0] === '제') {sido = '제주'}
      else if (location[0] === '세') {sido = '세종'}
      else if (location[0] === '울') {sido = '울산'}
      else if (location[0] === '울') {sido = '울산'}
      else if (location[0] === '광') {sido = '광주'}
      else if (location[0] === '강') {sido = '강원'}
      else if (location[1] === '구') {sido = '대구'}
      else if (location[1] === '전') {sido = '대전'}
      else if (location[0] === '전' && location[2] === '북') {sido = '전북'}
      else if (location[0] === '전' && location[2] === '남') {sido = '전남'}
      else if (location[0] === '충' && location[2] === '남') {sido = '충남'}
      else if (location[0] === '충' && location[2] === '북') {sido = '충북'}
      else if (location[0] === '경' && location[2] === '남') {sido = '경남'}
      // else if (location[0] === '경' && location[2] === '북') {sido = '경북'}
      else {sido = '경북'}
      const response = await fetch(`http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst?serviceKey=ero0PCiw0xS0m5XbHGdRNe4XLQfmyRSHVU2pPJQ7xx%2B%2BC2lnsL7zametsqSaIqJNoTXnkKCdi2l5oIxMKgLR%2FQ%3D%3D&returnType=json&numOfRows=1&sidoName=${sido}&searchCondition=DAILY`);
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

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});