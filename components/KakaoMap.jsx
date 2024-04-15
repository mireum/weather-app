"use client"

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false&libraries=services,clusterer`;

const KakaoMap = () => {
  const [locArr, setLocArr] = useState(null);

  useEffect(() => {
    const getStaticProps = async () => {
      try {
        const data = await fetch('http://localhost:3001/api/getMapWeather');
        const json = await data.json();
        setLocArr(json);
      } catch (error) {
        console.error(error);
      }
    };
    getStaticProps();
  }, []);
  
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map 
        center={{ lat: 36.150701, lng: 127.670667 }} 
        style={{ width: '100%', height: '80%' }}
        level={12}
        zoomable={false}
      >
        {locArr && locArr.map((item) => {
          return (
            <MapMarker key={item.name}
              position= {{
                lat: item.lat,
                lng: item.lng,
              }}
            >
              <div style={{ height: "30px", padding: "3px" }}>{item.name} 기온 {item.tem}&#8451;</div>
            </MapMarker>
          )
        })}
      </Map>
    </>
  );
};

export default KakaoMap;
