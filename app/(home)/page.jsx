// import styles from "./page.module.css";
// import { OpenGraph } from "../layout";

export const metadata = {
  // title: "qwer",
  // OpenGraph: {
  //   ...OpenGraph
  // }
};

export const API_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=ero0PCiw0xS0m5XbHGdRNe4XLQfmyRSHVU2pPJQ7xx%2B%2BC2lnsL7zametsqSaIqJNoTXnkKCdi2l5oIxMKgLR%2FQ%3D%3D&numOfRows=12&pageNo=1&dataType=JSON&base_date=20240324&base_time=0500&nx=55&ny=127";

const getWeather = async () => {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    // console.log(typeof json);
    // console.log(json);
    return json;
  } catch (err) {
    console.error(err);
  }
}

export default async function Home() {
  let weather = await getWeather();
  // console.log(weather.response.body.items);
  let info = weather.response.body.items.item;
  info = JSON.stringify(info);
  // const infoArr = Object.values(info);
  // console.log(infoArr);
  // console.log(typeof info);
  console.log(info);
  // weather = JSON.stringify(weather);
  // weather = JSON.parse(weather);
  // weather = Object.values(weather.response.body.items.item);
  // let ww = weather.response.body.items.item;
  // console.log('ww::', ww);
  // const qw = JSON.parse(ww);
  // console.log('qw::', qw);
  // const ww = JSON.parse(JSON.stringify(weather.response.body.items.item));
  return (
    <>
      <div>{info}</div>
      {/* <div>
        {info.map((item, index) => {
          <div key={index}>{item.category}</div>
        })}
      </div> */}
      {/* <div>{weather.response.body.items.item}</div> */}
      {/* <hr/> */}
      {/* <div>{weather.response.body.items.item[0]}</div> */}
    </>
  );
}
