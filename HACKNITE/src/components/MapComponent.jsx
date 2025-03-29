import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

export default function MapComponent() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (event) => {
    const clickedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedLocation(clickedLocation);

    // Send the coordinates to the backend
    sendCoordinatesToBackend(clickedLocation);
  };

  const sendCoordinatesToBackend = async (location) => {
    try {
      const response = await fetch("http://localhost:5000/api/coordinates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(location),
      });

      if (response.ok) {
        console.log("Coordinates sent successfully:", location);
      } else {
        console.error("Failed to send coordinates:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending coordinates:", error);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBubRR9n_FiPPnknhMZlxyHNm6s_7nzo2s">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={5}
        onClick={handleMapClick}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
    </LoadScript>
  );
}