"use client"
import { useEffect, useState } from "react";
import styles from "../styles/weatherData.module.css";

export default function WeatherData({data}) {
  const GetClock = () => {
    const d = new Date();
    const h = String(d.getHours()).padStart(2,"0");
    const m = String(d.getMinutes()).padStart(2,"0");

    return `${h}:${m}`;
  };
  const [time, setTime] = useState(GetClock());
  console.log(data);

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
  
  useEffect(() => {
    const IntervalTime = setInterval(() => {
      setTime(GetClock());
      }, 60000);
    return () => clearInterval(IntervalTime);
  }, []);

  return (
    <div className={styles.dataContainer}>
      <div className={styles.timeBox}>
        <div>현위치 기상</div>
        <div>{time}</div>
      </div>
      <ul>
        <li>현재 기온: {TMP}&#8451;</li>
        <li>풍향: {VEC}</li>
        <li>풍속: {WSD}m/s</li>
        <li>구름: {SKY}</li>
        <li>{POP === '강수없음' ? '' : `강수 확률: ${POP}%`}</li>
        {PCP === '강수없음' ? <li>강수량: 강수없음</li> :  <li>`강수량: ${PCP}mm`</li>}
        <li>습도: {REH}%</li>
      </ul>
    </div>
  );
}