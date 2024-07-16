import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetCarState } from "../store/Devices/services/devicesService";
import LoadingCompo from "../Components/LoadingCompo/LoadingCompo";

const CurrentLocation = () => {
  const { isLoading, error, CarState } = useSelector(
    (state) => state.devicesSlice
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  const [carLat, setCarLat] = useState(30.013056);
  const [carLong, setCarLong] = useState(31.208853);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Fetch car state immediately
    dispatch(GetCarState({ plate_number: id }));

    // Set up the interval to fetch car state every 10 seconds
    const interval = setInterval(() => {
      dispatch(GetCarState({ plate_number: id }));
    }, 10000); // 10000 ms = 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch, id]);

  useEffect(() => {
    // Update car coordinates when CarState changes
    if (CarState.latitude && CarState.longitude) {
      setCarLat(CarState.latitude);
      setCarLong(CarState.longitude);
    }
  }, [CarState]);

  useEffect(() => {
    if (mapRef.current) {
      // If map already exists, just update marker position
      if (markerRef.current) {
        markerRef.current.setLatLng([carLat, carLong]).update();
      }
      mapRef.current.setView([carLat, carLong], 15);
    } else {
      // Create a new map instance
      mapRef.current = L.map("map").setView([carLat, carLong], 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Add a marker to the map at the initial coordinates
      markerRef.current = L.marker([carLat, carLong])
        .addTo(mapRef.current)
        .bindPopup(`Latitude: ${carLat}, Longitude: ${carLong}`)
        .openPopup();
    }
  }, [carLat, carLong]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <LoadingCompo />
      </div>
    );
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

export default CurrentLocation;
