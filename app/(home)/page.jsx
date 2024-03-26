"use client"

import { useEffect, useState } from "react";
// import { OpenGraph } from "../layout";

// export const metadata = {
//   // title: "qwer",
//   // OpenGraph: {
//   //   ...OpenGraph
//   // }
// };

export const API_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=ero0PCiw0xS0m5XbHGdRNe4XLQfmyRSHVU2pPJQ7xx%2B%2BC2lnsL7zametsqSaIqJNoTXnkKCdi2l5oIxMKgLR%2FQ%3D%3D&numOfRows=12&pageNo=1&dataType=JSON&base_date=20240326&base_time=1400&nx=55&ny=127";

// const getWeather = async () => {
//   try {
//     const response = await fetch(API_URL);
//     const json = await response.json();
//     return json;
//   } catch (err) {
//     console.error(err);
//   }
// }

export default function Home() {

  // const weather = await getWeather();
  // const info = weather.response.body.items.item;
  // console.log(info);
  // 현재 기온
  // const TMP = info[0].fcstValue;
  // // 풍향
  // const VEC = info[3].fcstValue;
  // // 풍속
  // const WSD = info[4].fcstValue;
  // // 하늘상태
  // const SKY = info[5].fcstValue;
  // // 강수확률
  // const POP = info[7].fcstValue;
  // // 1시간 강수량
  // const PCP = info[9].fcstValue;
  // // 습도
  // const REH = info[10].fcstValue;
  // // 강수확률
  // const rain = info[8].fcstValue;
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.error('Error getting geolocation:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    // 페이지가 마운트될 때 위치 정보를 가져옴
    getLocation();
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchData = async () => {
        try {
          const apiKey = 'ero0PCiw0xS0m5XbHGdRNe4XLQfmyRSHVU2pPJQ7xx%2B%2BC2lnsL7zametsqSaIqJNoTXnkKCdi2l5oIxMKgLR%2FQ%3D%3D';
          const baseDate = '20240326';
          const baseTime = '1400';
          const nx = '55';
          const ny = '127';
          // const nx = Math.floor((longitude - 124) * 88 / 1.2); // 경도에 따른 nx 계산
          // const ny = Math.floor((latitude - 33) * 68 / 1.0); // 위도에 따른 ny 계산
          const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&numOfRows=12&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

          const response = await fetch(apiUrl);
          const data = await response.json();
          console.log(data);
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

      fetchData();
    }
  }, [latitude, longitude]);
 
  return (
    <>
      <div>
        <h1>사용자 위치 정보</h1>
        {latitude && longitude ? (
          <p>
            위도: {latitude}, 경도: {longitude}
          </p>
        ) : (
          <p>위치 정보를 가져오는 중...</p>
        )}
        {weatherData ? (
          <div>
            <h2>날씨 데이터</h2>
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
          </div>
        ) : (
          <p>날씨 정보를 가져오는 중...</p>
        )}
      </div>
    </>
  );
}
