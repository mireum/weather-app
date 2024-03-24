// import styles from "./page.module.css";
// import { OpenGraph } from "../layout";

export const metadata = {
  // title: "qwer",
  // OpenGraph: {
  //   ...OpenGraph
  // }
};

export const API_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=ero0PCiw0xS0m5XbHGdRNe4XLQfmyRSHVU2pPJQ7xx%2B%2BC2lnsL7zametsqSaIqJNoTXnkKCdi2l5oIxMKgLR%2FQ%3D%3D&numOfRows=10&pageNo=1&dataType=JSON&base_date=20210628&base_time=0600&nx=55&ny=127";

const getWeather = async () => {
  const response = await fetch(API_URL);
  console.log(response);
  // const json = await JSON.parse(response);
  const json = await response.json();
  console.log(json);
  return JSON.stringify(json);
}

export default async function Home() {
  const weather = await getWeather();
  
  return (
    <>
      <div>{weather}</div>
    </>
  );
}
