import Script from 'next/script';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false&libraries=services,clusterer`;

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

async function getStaticProps() {
  const apiKey = 'ero0PCiw0xS0m5XbHGdRNe4XLQfmyRSHVU2pPJQ7xx%2B%2BC2lnsL7zametsqSaIqJNoTXnkKCdi2l5oIxMKgLR%2FQ%3D%3D';
  const day = new Date();
  const baseDate = day.getFullYear()+String(day.getMonth()+1).padStart(2, '0')+String(day.getDate()).padStart(2, '0');
  let nowTime = String(day.getHours())+String(day.getMinutes()).padStart(2, '0');
  nowTime = Number(nowTime);
  let standTime;
  if (nowTime > 2310) {standTime = '2300'}
  else if (nowTime > 2010) {standTime = '2000'}
  else if (nowTime > 1710) {standTime = '1700'}
  else if (nowTime > 1410) {standTime = '1400'}
  else if (nowTime > 1110) {standTime = '1100'}
  else if (nowTime > 810) {standTime = '0800'}
  else if (nowTime > 510) {standTime = '0500'}
  else {standTime = '0200'}
  const baseTime = standTime;

  const promises = locArr.map( async (item) => {
    const nx = item.nx;
    const ny = item.ny;
    const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&numOfRows=12&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  });

  const result = await Promise.all(promises);
  return result;
}
const data = getStaticProps().then((result) => {
  console.log('성공');
  console.log(result);
}).catch((error) => {
  console.error('실패');
});
console.log("data::", data);

const KakaoMap = () => {
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map 
        center={{ lat: 36.150701, lng: 127.670667 }} 
        style={{ width: '100%', height: '80%' }}
        level={12}
        zoomable={false}
      >
        {locArr.map((item) => {
          return (
            <MapMarker key={item.name}
              position= {{
                lat: item.lat,
                lng: item.lng,
              }}
            >
              <div style={{ height: "30px", padding: "3px" }}>{item.name} 기온 15&#8451;</div>
            </MapMarker>
          )
        })}
      </Map>
    </>
  );
};

export default KakaoMap;