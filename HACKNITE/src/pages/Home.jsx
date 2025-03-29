import React from "react";
import MapComponent from "../components/MapComponent"; // Import the Map component

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to AgriMap</h1>
        <p>
          Select a location on the map below to get precise coordinates. Use this
          tool to optimize your agricultural planning and resource management.
        </p>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2>Select a Location</h2>
        <MapComponent />
      </section>
    </div>
  );
}