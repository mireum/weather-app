"use client"

import { useEffect, useState } from "react";
import { TiWeatherCloudy, TiWeatherDownpour, TiWeatherPartlySunny, TiWeatherSunny } from "react-icons/ti";
// import styles from "../styles/weatherData.module.css";

export default function WeatherData({data, position}) {
  const GetClock = () => {
    const d = new Date();
    const h = String(d.getHours()).padStart(2,"0");
    const m = String(d.getMinutes()).padStart(2,"0");

    return `${h}:${m}`;
  };

  const [time, setTime] = useState(GetClock());
  const [location, setLocation] = useState(null);
  console.log(data);
  console.log(position);
  // 현재 기온
  const TMP = data[0].fcstValue;
  // 풍향
  let VEC = data[3].fcstValue;
  if (VEC <= 90) {VEC = '동풍'}
  else if (VEC <= 180) {VEC = '남풍'}
  else if (VEC <= 270) {VEC = '서풍'}
  else {VEC = '북풍'}
  // 풍속
  const WSD = data[4].fcstValue;
  // 구름
  let SKY = data[5].fcstValue;
  if (SKY < 3) {
    SKY = '맑음';
  } else if (SKY < 6) {
    SKY = '구름 있음';
  } else if (SKY < 8) {
    SKY = '구름 많음';
  } else {
    SKY = '흐림';
  }
  // 강수확률
  const POP = data[7].fcstValue;
  // 1시간 강수량
  const PCP = data[9].fcstValue;
  // 습도
  const REH = data[10].fcstValue;
  // 아이콘
  let icon;
  if (Number(POP) > 70) {icon = 'rainy'}
  else if (SKY === "맑음") {icon = 'sunny'}
  else if (SKY === "구름 많음") {icon = 'partlySun'}
  else {icon = 'cloudy'}
  
  useEffect(() => {
    const IntervalTime = setInterval(() => {
      setTime(GetClock());
      }, 60000);
    return () => clearInterval(IntervalTime);
  }, []);

  useEffect(() => {
    const GetLocation = async () => {
      try {
        // const apiKey = '481EB071-C586-3A91-9DB2-23C53DC4ACA0';
        // const crs = 'EPSG:4019';
        // const point = `${position[1]},${position[0]}`;
        // const format = 'json';
        // const type = 'PARCEL';
        // const zipcode = 'false';
        // // const simple = 'true';
        // const apiUrl = `https://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&key=${apiKey}&crs=${crs}&point=${point}&format=${format}&type=${type}&zipcode=${zipcode}&errorFormat=json&callback=?`;
  
        // const response = await fetch(apiUrl);
        // console.log(response);
        // const data = await response.json();
        // setLocation(data);
        const data = await fetch('/api/route');
        console.log('tat::',data);

      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    }
    GetLocation();
  }, [position]);

  return (
    <div className='dataContainer'>
      <div className={'timeBox'}>
        <div>현위치 {location ? '인천' : '없ㅇ음'} 기상</div>
        <div>{time}</div>
      </div>
      <div className="dataBox">
        <div className="iconBox">
          {icon === 'rainy' ? <TiWeatherDownpour className="icon"/>
          : icon === 'sunny' ? <TiWeatherSunny className="icon"/>
          : icon === 'partlySun' ? <TiWeatherPartlySunny className="icon"/>
          : <TiWeatherCloudy className="icon"/>
          }
        </div>
        <div className="data">
          <ul>
            <li><span className="label">현재 기온</span><span className="value">{TMP}&#8451;</span></li>
            <li><span className="label">풍향</span><span className="value">{VEC}</span></li>
            <li><span className="label">풍속</span><span className="value">{WSD}m/s</span></li>
            <li><span className="label">구름</span><span className="value">{SKY}</span></li>
            <li><span className="label">강수 확률</span><span className="value">{POP}%</span></li>
            <li><span className="label">강수량</span><span className="value">{PCP === '강수없음' ? '강수없음' : `${PCP}mm`}</span></li>
            <li><span className="label">습도</span><span className="value">{REH}%</span></li>
            <li><span className="label">미세먼지</span><span className="value">매우나쁨</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}