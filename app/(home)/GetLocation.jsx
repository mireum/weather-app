
export const getInfo = async (aa) => {
  navigator.geolocation.getCurrentPosition((pos) => {
    aa.push(pos)
  })
}

export default async function GetLocation() {
  let aa = [];
  // const [location, setLocation] = useState({
  //   latitude: null,
  //   longitude: null,
  // });
  // // getCurrentPosition
  // useEffect(() => {
  //   const watcher = navigator.geolocation.watchPosition((position) => {
  //     setLocation({
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     });
  //   });
  //   return () => navigator.geolocation.clearWatch(watcher);
  // }, []);
  await getInfo(aa);
  console.log(aa);
  return (
    <div>
      <h1>Your Current Location</h1>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
}