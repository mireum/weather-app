const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const { getDate } = require('./components/API_Function.js');
// const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
// const app = next({
//   dev,
//   conf: { distDir: `${path.relative(process.cwd(), __dirname)}/../next` },
// });
const handle = app.getRequestHandler();

const locArr = [
  {'name': '서울', 'nx': '60', 'ny': '127', 'lat': 37.564213, 'lng': 126.981698},
  {'name': '부산', 'nx': '98', 'ny': '76', 'lat': 35.177, 'lng': 129.08},
  {'name': '대구', 'nx': '89', 'ny': '90', 'lat': 35.86, 'lng': 128.6},
  {'name': '인천', 'nx': '55', 'ny': '124', 'lat': 37.45, 'lng': 126.7},
  {'name': '광주', 'nx': '58', 'ny': '74', 'lat': 35.15, 'lng': 126.85},
  {'name': '대전', 'nx': '67', 'ny': '100', 'lat': 36.34, 'lng': 127.38},
  {'name': '울산', 'nx': '102', 'ny': '84', 'lat': 35.53, 'lng': 129.34},
  {'name': '경기', 'nx': '60', 'ny': '120', 'lat': 37.27, 'lng': 127.01},
  {'name': '제주', 'nx': '52', 'ny': '38', 'lat': 33.485, 'lng': 126.55},
];

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  
  
  // 좌표로 지역명 찾기
  server.post('/api/getLocation', async (req, res) => {
    try {
      const apiKey = process.env.GET_LOCATION_API_KEY;
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

  // 좌표로 지역의 날씨 api 받아오기
  server.post('/api/getWeather', async (req, res) => {
    try {
      const apiKey = process.env.WEATHER_API_KEY;
      const day = new Date();
      const baseDate = day.getFullYear()+String(day.getMonth()+1).padStart(2, '0')+String(day.getDate()).padStart(2, '0');
      const baseTime = getDate();
      const nx = req.body.lng;
      const ny = req.body.lat;
      const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&numOfRows=12&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      res.json(data);

    } catch (error) {
      console.error(error);
    }
  });


  // 지역명의 미세먼지 지수 찾기
  server.post('/api/getDust', async (req, res) => {
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

  // 지도에 들어갈 모든 지역의 날씨 api 받아오기
  server.get('/api/getMapWeather', async (req, res) => {
    try {
      const apiKey = process.env.WEATHER_API_KEY;
      const day = new Date();
      const baseDate = day.getFullYear()+String(day.getMonth()+1).padStart(2, '0')+String(day.getDate()).padStart(2, '0');
      const baseTime = getDate();

      const promises = locArr.map( async (item) => {
        const nx = item.nx;
        const ny = item.ny;
        const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&numOfRows=12&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        item.tem = data.response.body.items.item[0].fcstValue;
        return item;
      });
      const results = await Promise.all(promises);
      res.json(results);

    } catch (error) {
      console.error(error);
    }
  });


  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3001, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3001');
  });
});