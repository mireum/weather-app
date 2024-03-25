"use client"
import { Suspense, useState } from "react";
import Getlocation from "./getLocation";
// import Getlocation from "./getLocation";

// import styles from "./page.module.css";
// import { OpenGraph } from "../layout";
// import { useGeolocated } from "react-geolocated";

// export const metadata = {
//   // title: "qwer",
//   // OpenGraph: {
//   //   ...OpenGraph
//   // }
// };

export const API_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=ero0PCiw0xS0m5XbHGdRNe4XLQfmyRSHVU2pPJQ7xx%2B%2BC2lnsL7zametsqSaIqJNoTXnkKCdi2l5oIxMKgLR%2FQ%3D%3D&numOfRows=12&pageNo=1&dataType=JSON&base_date=20240325&base_time=2000&nx=55&ny=127";

const getWeather = async () => {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}

export default async function Home() {

  const weather = await getWeather();
  const info = weather.response.body.items.item;
  // console.log(info);
  // 현재 기온
  const TMP = info[0].fcstValue;
  // 풍향
  const VEC = info[3].fcstValue;
  // 풍속
  const WSD = info[4].fcstValue;
  // 하늘상태
  const SKY = info[5].fcstValue;
  // 강수확률
  const POP = info[7].fcstValue;
  // 1시간 강수량
  const PCP = info[9].fcstValue;
  // 습도
  const REH = info[10].fcstValue;
  // 강수확률
  const rain = info[8].fcstValue;
  // console.log(location);
  return (
    <>
      {/* <div>강수확률: {rain}</div> */}
      <Getlocation />
    </>
  );
}
