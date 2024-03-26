import { API_URL } from "./page";

export const getWeather = async () => {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}

export default async function GetWeather() {
  const weather = await getWeather();

  const info = weather.response.body.items.item;
  const TMP = info[0].fcstValue;
  const VEC = info[3].fcstValue;
  return (
    <div>{TMP}, {VEC}</div>
  );
}