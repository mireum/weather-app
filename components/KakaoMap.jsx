import Script from 'next/script';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false&libraries=services,clusterer`;


const KakaoMap = () => {
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map 
        center={{ lat: 36.150701, lng: 127.670667 }} 
        style={{ width: '100%', height: '80%' }}
        level={12}
        zoomable={false}
      >
        {/* 서울 */}
        <MapMarker 
          position= {{
            lat: 37.564213,
            lng: 126.981698,
          }}
        >
          <div style={{ height: "30px", padding: "3px" }}>서울 기온 15&#8451;</div>
        </MapMarker>

      </Map>
    </>
  );
};

export default KakaoMap;