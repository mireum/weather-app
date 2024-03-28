"use client"

import { useEffect, useState } from "react";
import dfs_xy_conv from "@/components/Function";
import WeatherData from "@/components/weatherData";
// import { OpenGraph } from "../layout";

// export const metadata = {
//   // title: "qwer",
//   // OpenGraph: {
//   //   ...OpenGraph
//   // }
// };

export default function Home() {
  const GetClock = () => {
    const d = new Date();
    const h = String(d.getHours()).padStart(2,"0");
    const m = String(d.getMinutes()).padStart(2,"0");

    return `${h}:${m}`;
  };
  
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [time, setTime] = useState(GetClock());
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const GetLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const nxny = dfs_xy_conv("toXY", position.coords.latitude, position.coords.longitude);
            console.log(nxny);
            setLatitude(nxny.x);
            setLongitude(nxny.y);
          },
          (error) => {
            console.error('Error getting geolocation:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    GetLocation();
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const FetchData = async () => {
        try {
          const apiKey = 'ero0PCiw0xS0m5XbHGdRNe4XLQfmyRSHVU2pPJQ7xx%2B%2BC2lnsL7zametsqSaIqJNoTXnkKCdi2l5oIxMKgLR%2FQ%3D%3D';
          const baseDate = '20240328';
          const baseTime = '0800';
          const nx = `${longitude}`;
          const ny = `${latitude}`;
          const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&numOfRows=12&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

          const response = await fetch(apiUrl);
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

      FetchData();
    }
  }, [latitude, longitude]);
 
  useEffect(() => {
    const IntervalTime = setInterval(() => {
      setTime(GetClock());
      }, 60000);
    return () => clearInterval(IntervalTime);
  }, []);


  return (
    <>
      <div>
        {/* <h1>사용자 위치 정보</h1>
        {latitude && longitude ? (
          <p>
            위도: {latitude}, 경도: {longitude}
          </p>
        ) : (
          <p>위치 정보를 가져오는 중...</p>
        )} */}
        <div>현재 시각 {time}</div>

        {weatherData ? (
          <div>
            <h2>현위치 기상</h2>
            <WeatherData data={weatherData.response.body.items.item}/>
          </div>
        ) : (
          <p>날씨 정보를 가져오는 중...</p>
        )}
      </div>
    </>
  );
}
