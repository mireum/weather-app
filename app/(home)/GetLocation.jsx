"use client"
import React, { useEffect, useState } from "react";

export default function Getlocation() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  // getCurrentPosition
  useEffect(() => {
    const watcher = navigator.geolocation.watchPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return (
    <div>
      <h1>Your Current Location</h1>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
}