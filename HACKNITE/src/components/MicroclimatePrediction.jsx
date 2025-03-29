import React, { useState, useEffect } from "react";

const MicroclimatePrediction = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch weather data from the backend
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/weather");
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="microclimate-prediction">
      <h2>Physics-Guided Microclimate Prediction</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData ? (
        <div className="charts">
          <p>
            <strong>Temperatures:</strong> {weatherData.temperature}°C
          </p>
          <p>
            <strong>Humidity:</strong> {weatherData.humidity}%
          </p>
          <p>
            <strong>Rainfall:</strong> {weatherData.rainfall}mm expected in the last hour
          </p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
      <button onClick={() => window.location.reload()}>Refresh Data</button>
    </div>
  );
};

export default MicroclimatePrediction;