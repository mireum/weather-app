export default function WeatherData({data}) {

  console.log(data);
  let cloud = data[5].fcstValue;

  if (cloud < 3) {
    cloud = '맑음';
  } else if (cloud < 6) {
    cloud = '구름 있음';
  } else if (cloud < 8) {
    cloud = '구름 많음';
  } else {
    cloud = '흐림';
  }
  // 현재 기온
  const TMP = data[0].fcstValue;
  // 풍향
  const VEC = data[3].fcstValue;
  // 풍속
  const WSD = data[4].fcstValue;
  // 하늘상태
  const SKY = cloud;
  // 강수확률
  const POP = data[7].fcstValue;
  // 1시간 강수량
  const PCP = data[9].fcstValue;
  // 습도
  const REH = data[10].fcstValue;
  
  return (
    <div>
      <ul>
        <li>현재 기온: {TMP} &#8451;</li>
        <li>풍향: {VEC} deg</li>
        <li>풍속: {WSD}m/s</li>
        <li>구름: {cloud}</li>
        <li>강수 확률: {POP}%</li>
        <li>강수량: {PCP}mm</li>
        <li>습도: {REH} %</li>
      </ul>
    </div>
  );
}