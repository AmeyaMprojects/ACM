import React from "react";
import MapComponent from "./components/MapComponent";
import './index.css'

export default function App() {
  return (
    <div className="container">
      <h1>Select a Location on the Map</h1>
      <MapComponent />
    </div>
  );
}