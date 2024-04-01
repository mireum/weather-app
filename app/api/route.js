export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req, res) {
  console.log('qweqwe');
  const response = await fetch('https://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&key=481EB071-C586-3A91-9DB2-23C53DC4ACA0&crs=EPSG:4019&point=126.7269632,37.4079488&format=json&type=PARCEL&zipcode=false&callback', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
  console.log(response);
  const data = await res.json();
  console.log(data);

}

