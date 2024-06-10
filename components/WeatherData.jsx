"use client"

import { useEffect, useState } from "react";
import { TiWeatherCloudy, TiWeatherDownpour, TiWeatherPartlySunny, TiWeatherSunny } from "react-icons/ti";

export default function WeatherData({data, position}) {
  const GetClock = () => {
    const d = new Date();
    const h = String(d.getHours()).padStart(2,"0");
    const m = String(d.getMinutes()).padStart(2,"0");

    return `${h}:${m}`;
  };

  const [time, setTime] = useState(GetClock());
  const [location, setLocation] = useState([]);
  const [dust, setDust] = useState(null);

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
  if (PCP !== '강수없음') {icon = 'rainy'}
  else if (SKY === "맑음") {icon = 'sunny'}
  else if (SKY === "구름 많음") {icon = 'partlySun'}
  else {icon = 'cloudy'}
  
  useEffect(() => {
    const IntervalTime = setInterval(() => {
      setTime(GetClock());
      }, 60000);
    return () => clearInterval(IntervalTime);
  }, []);

  // 현재 좌표로 지역을 찾는 훅
  useEffect(() => {
    const GetLocation = async () => {
      try {
        const data = await fetch('http://localhost:3001/api/getLocation', {
        // const data = await fetch('https://thedayday.netlify.app/api/getLocation', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lng: `${position[1]}`,
            lat: `${position[0]}`,
          })
        });
        const json = await data.json();
        setLocation([json.response.result[0].structure.level1, json.response.result[0].structure.level2]);
  
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    }
    GetLocation();
  }, [position]);

  // 미세먼지데이터 가져오기
  useEffect(() => {
    const GetDust = async () => {
      try {
        const data = await fetch('http://localhost:3001/api/getDust', {
        // const data = await fetch('https://thedayday.netlify.app/api/getDust', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sido: `${location[0]}`
          })
        });
        const json = await data.json();
        setDust(json.response.body.items[0].pm25Value);

      } catch (error) {
        console.error('미세먼지데이터 가져오기 실패');
      }
    }
    GetDust();
  }, [location]);

  return (
    <div className='dataContainer'>
      <div className='timeBox'>
        <div>현재 {!location ? '' : `${location[0]} ${location[1]}`} 기상</div>
        <div>{time}</div>
      </div>
      <div className="dataBox">
        <div>
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
            <li><span className="label">강수량</span><span className="value">{PCP === '강수없음' ? '강수 없음' : `${PCP}`}</span></li>
            <li><span className="label">습도</span><span className="value">{REH}%</span></li>
            <li><span className="label">미세먼지</span><span className="value">{dust > 75 ? '매우 나쁨' 
            : dust > 35 && dust < 76 ? '나쁨'
            : dust > 15 && dust < 36 ? '보통' : '좋음'}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}