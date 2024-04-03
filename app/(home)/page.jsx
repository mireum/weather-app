"use client"

import { useEffect, useState } from "react";
import dfs_xy_conv from "@/components/Function";
import WeatherData from "@/components/weatherData";
// import styles from "../../styles/page.module.css"
import KakaoMap from "@/components/KakaoMap";

export default function Home() {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [position, setPosition] = useState([]);

  // 현재 사용자의 좌표를 얻는 함수
  useEffect(() => {
    const GetLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const nxny = dfs_xy_conv("toXY", position.coords.latitude, position.coords.longitude);
            console.log(nxny);
            setLatitude(nxny.x);
            setLongitude(nxny.y);
            setPosition([nxny.lat, nxny.lng]);
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

  // 받은 사용자의 좌표로 그 지역의 날씨 api 요청
  useEffect(() => {
    if (latitude && longitude) {
      const FetchData = async () => {
        try {
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
 
  return (
    <>
      <div>
        {/* <div className={styles.container}> */}
        <div className="w-4/5 m-auto">
          <div>
            {weatherData ? (
              <WeatherData data={weatherData.response.body.items.item} position={position}/>
            ) : (
              <p>날씨 정보를 가져오는 중...</p>
            )}
          </div>
          <div className="w-3/5 m-auto h-screen">
            <KakaoMap />
          </div>
        </div>
      </div>
    </>
  );
}
