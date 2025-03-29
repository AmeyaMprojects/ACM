import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

// Google Maps API configuration
const mapContainerStyle = {
  width: "100%",
  height: "500px",
};
const defaultCenter = {
  lat: 20.5937, // Center of India
  lng: 78.9629,
};
const libraries = ["places"];

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  // Handle map click event
  const handleMapClick = (event) => {
    const clickedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedLocation(clickedLocation);
    setCoordinates(clickedLocation);

    // Send coordinates to backend
    sendCoordinatesToBackend(clickedLocation);
  };

  // Function to send coordinates to backend
  const sendCoordinatesToBackend = async (coords) => {
    try {
      const response = await axios.post("http://localhost:5000/api/coordinates", coords);
      console.log("Coordinates sent to backend:", response.data);
    } catch (error) {
      console.error("Error sending coordinates:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Select a Location on the Map</h1>
      <LoadScript googleMapsApiKey="AIzaSyBubRR9n_FiPPnknhMZlxyHNm6s_7nzo2s" libraries={libraries}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={5}
          onClick={handleMapClick}
        >
          {/* Display marker at selected location */}
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      </LoadScript>

      {coordinates && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Coordinates:</h3>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>
        </div>
      )}
    </div>
  );
}