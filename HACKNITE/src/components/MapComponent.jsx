import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

const MapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [serverCoordinates, setServerCoordinates] = useState(null);

  // Handle map click
  const handleMapClick = (event) => {
    const clickedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedLocation(clickedLocation);
    sendCoordinatesToBackend(clickedLocation);
  };

  // Send coordinates to the backend
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
        fetchCoordinatesFromBackend(); // Fetch updated coordinates
      } else {
        console.error("Failed to send coordinates:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending coordinates:", error);
    }
  };

  // Fetch coordinates from the backend
  const fetchCoordinatesFromBackend = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/coordinates");
      if (response.ok) {
        const data = await response.json();
        setServerCoordinates(data);
      } else {
        console.error("Failed to fetch coordinates:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  useEffect(() => {
    fetchCoordinatesFromBackend(); // Fetch when the component mounts
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-lg font-bold mb-2">Select a Location</h2>
      <LoadScript googleMapsApiKey="AIzaSyBubRR9n_FiPPnknhMZlxyHNm6s_7nzo2s">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={serverCoordinates || defaultCenter}
          zoom={5}
          onClick={handleMapClick}
        >
          {selectedLocation && <Marker position={selectedLocation} />}
          {serverCoordinates && (
            <Marker
              position={serverCoordinates}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      <div className="mt-4 text-center">
        <h3 className="font-semibold">Server Coordinates:</h3>
        {serverCoordinates ? (
          <p>
            Latitude: {serverCoordinates.lat}, Longitude: {serverCoordinates.lng}
          </p>
        ) : (
          <p>Loading coordinates from server...</p>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
