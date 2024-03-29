"use client"

import { useEffect, useState } from "react";
import dfs_xy_conv from "@/components/Function";
import WeatherData from "@/components/weatherData";
import styles from "../../styles/page.module.css"
// import { OpenGraph } from "../layout";

// export const metadata = {
//   // title: "qwer",
//   // OpenGraph: {
//   //   ...OpenGraph
//   // }
// };

export default function Home() {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
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
 
  return (
    <>
      <div>
        <div className={styles.container}>
          {weatherData ? (
            <WeatherData data={weatherData.response.body.items.item}/>
          ) : (
            <p>날씨 정보를 가져오는 중...</p>
          )}
        </div>
      </div>
    </>
  );
}
