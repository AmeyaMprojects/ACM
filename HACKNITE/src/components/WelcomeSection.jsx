import React, { useState, useEffect } from "react";

const WelcomeSection = () => {
  const [weather, setWeather] = useState("Loading...");
  const [temperature, setTemperature] = useState("Loading...");
  const [waterUsage, setWaterUsage] = useState("Loading...");
  const [pestRisk, setPestRisk] = useState("Loading...");
  const [intercroppingSuggestion, setIntercroppingSuggestion] = useState("Loading...");
  const [earlyWarning, setEarlyWarning] = useState("Loading...");
  const farmerName = "RAJU"; // Replace with dynamic data if needed
  const today = new Date().toLocaleDateString(); // Get today's date

  useEffect(() => {
    // Fetch weather data
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Delhi&units=metric&appid=a002f5b7e08fef73ab9f5efca4598b54")
      .then((response) => response.json())
      .then((data) => {
        console.log("Weather API Response:", data); // Log the response to debug

        if (data.weather && data.weather.length > 0 && data.main) {
          setWeather(data.weather[0].description);
          setTemperature(`${data.main.temp}°C`);
        } else {
          setWeather("Weather data unavailable");
          setTemperature("N/A");
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeather("Failed to load");
        setTemperature("N/A");
      });

    // Simulate fetching other data
    setTimeout(() => {
      setWaterUsage("Irrigation needed today");
      setPestRisk("Low risk detected");
      setIntercroppingSuggestion("Maize + Legumes");
      setEarlyWarning("No alerts");
    }, 1000); // Simulated delay
  }, []);

  return (
    <div className="welcome-section">
      <h1>Good Morning, {farmerName}!</h1>
      <p><strong>Date:</strong> {today}</p>
      <div className="farm-summary">
        <p><strong>Weather Forecast:</strong> {weather}, {temperature}</p>
        <p><strong>Water Usage:</strong> {waterUsage}</p>
        <p><strong>Pest Risk:</strong> {pestRisk}</p>
        <p><strong>Intercropping Suggestion:</strong> {intercroppingSuggestion}</p>
        <p><strong>Early Warning:</strong> {earlyWarning}</p>
      </div>
    </div>
  );
};

export default WelcomeSection;
