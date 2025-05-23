import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",       // Takes full width of parent container
  height: "70vh",      // 70% of viewport height (or use "600px" for fixed size)
  borderRadius: "20px",
  overflow: "hidden",
  minHeight: "500px",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

const MapComponent = ({ onCoordinatesSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [serverCoordinates, setServerCoordinates] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  // Handle map click
  const handleMapClick = (event) => {
    const clickedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedLocation(clickedLocation);
  
    // Send the selected coordinates to the backend
    fetch("http://localhost:5000/api/coordinates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clickedLocation),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Coordinates sent to backend:", data);
      })
      .catch((error) => {
        console.error("Error sending coordinates to backend:", error);
      });
  };

  // Handle place selection from the search bar
  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelectedLocation(location);
        sendCoordinatesToBackend(location);
      }
    }
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
    onCoordinatesSelect(selectedCoordinates);
  };

  useEffect(() => {
    fetchCoordinatesFromBackend(); // Fetch when the component mounts
  }, []);

  return (
    <div className="map-component" style={{ width: "50%", height: "100%" }}>
      <h2 className="map-title">Select a Location</h2>
      <LoadScript googleMapsApiKey="AIzaSyBubRR9n_FiPPnknhMZlxyHNm6s_7nzo2s" libraries={["places"]}>
        <Autocomplete
          onLoad={(autocompleteInstance) => setAutocomplete(autocompleteInstance)}
          onPlaceChanged={handlePlaceSelect}
        >
          <input
            type="text"
            placeholder="Search for a location"
            className="map-search-bar"
          />
        </Autocomplete>
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
    </div>
  );
};

export default MapComponent;