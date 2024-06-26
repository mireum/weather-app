"use client"

import { useEffect, useState } from "react";
import { dfs_xy_conv } from "@/components/Function";
import WeatherData from "@/components/WeatherData";
import KakaoMap from "@/components/KakaoMap";
import Link from "next/link";

export default function Home() {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [position, setPosition] = useState([]);

  // 세션 상태
  const { data } = useSession();

  return (
    <>
      <div>
        <div className="w-4/5 m-auto">
          <div className="w-3/5 m-auto flex p-5">
            <Link className="text-sky-600 hover:text-sky-700" href={"/"}>
              그날그날
            </Link>

            <div className="flex gap-2 ml-auto">
              {/* {data?.user ? (
                <>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={data.user.image || ""}
                  />
                  <p className="text-sky-600"> {data.user.name}</p>
                  <button className="text-red-500" onClick={() => signOut()}>
                  <button className="text-red-500" onClick={undefined}>
                    Sign Out
                  </button>
                </>
              ) : (
                 <button className="text-green-600" onClick={() => signIn()}> */}
                <button className="text-green-600" onClick={undefined}>
                  Sign In
                </button>
              {/* )} */}
            </div>
          </div>


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
