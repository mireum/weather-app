"use client"

import React, { useEffect, useState } from "react";

export default function GetLocation() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  
  // getCurrentPosition
  useEffect(() => {
    if (navigator.geolocation) {
      const watcher = navigator.geolocation.watchPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
      return () => navigator.geolocation.clearWatch(watcher);
    }
    else console.log("no navigator");

  }, [location]);
  // await getInfo(aa);

  return (
    <div>
      <h1>Your Current Location</h1>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
}