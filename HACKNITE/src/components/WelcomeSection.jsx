import React, { useState, useEffect } from "react";

const WelcomeSection = () => {
  const [coordinates, setCoordinates] = useState(null); // Store coordinates
  const [weather, setWeather] = useState("Loading weather data...");
  const [temperature, setTemperature] = useState("");
  const [waterIrrigation, setWaterIrrigation] = useState("Calculating...");
  const [weatherImage, setWeatherImage] = useState("");
  const farmerName = "Admin";
  const today = new Date().toLocaleDateString();

  // Weather image mapping
  const weatherImages = {
    clear: "/clear_sky.jpg",
    clouds: "/cloudy.jpg",
    rain: "/rain.jpg",
    thunderstorm: "/storm.jpg",
    drizzle: "/rain.jpg",
    fog: "/fog.jpg",
    mist: "/fog.jpg",
    haze: "/fog.jpg",
  };

  // Fetch coordinates from the server
  useEffect(() => {
    fetch("http://localhost:5000/api/coordinates")
      .then((response) => response.json())
      .then((data) => {
        console.log("Coordinates from server:", data);
        setCoordinates(data); // Save coordinates
      })
      .catch((error) => {
        console.error("Error fetching coordinates:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/coordinates")
      .then((response) => response.json())
      .then((data) => {
        console.log("Coordinates from server:", data);
        setCoordinates(data); // Save coordinates
      })
      .catch((error) => {
        console.error("Error fetching coordinates:", error);
      });
  }, []);

  // Fetch weather data based on coordinates
  useEffect(() => {
    if (coordinates) {
      const { latitude, longitude } = coordinates;

      console.log("Fetching weather data for coordinates:", latitude, longitude);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=a002f5b7e08fef73ab9f5efca4598b54`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Weather API response:", data);

          if (data.weather && data.weather.length > 0 && data.main) {
            const weatherMain = data.weather[0].main.toLowerCase();
            setWeather(data.weather[0].description);
            setTemperature(`${data.main.temp}°C`);

            // Set appropriate weather image
            setWeatherImage(weatherImages[weatherMain] || "/cloudy.jpg");

            // Determine irrigation suggestion
            if (weatherMain.includes("rain") || weatherMain === "drizzle") {
              setWaterIrrigation("No irrigation needed (rain expected)");
            } else if (data.main.temp > 30) {
              setWaterIrrigation("Heavy irrigation recommended");
            } else if (data.main.temp > 20) {
              setWaterIrrigation("Moderate irrigation recommended");
            } else {
              setWaterIrrigation("Light irrigation recommended");
            }
          } else {
            setWeather("Weather data unavailable");
            setWeatherImage("/cloudy.jpg");
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setWeather("Weather data unavailable");
          setWeatherImage("/cloudy.jpg");
        });
    }
  }, [coordinates]);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        width: "500px",
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ color: "#2e7d32", marginBottom: "10px" }}>
        Good Morning, {farmerName}!
      </h1>
      <p style={{ fontWeight: "bold", marginBottom: "20px" }}>Today: {today}</p>

      {/* Weather Forecast Box */}
      <div
        style={{
          backgroundColor: "#f0f8ff",
          borderRadius: "10px",
          padding: "15px",
          marginBottom: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ color: "#1e88e5", marginTop: "0" }}>Weather Forecast</h3>
        {weatherImage && (
          <img
            src={weatherImage}
            alt={weather}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          />
        )}
        <p style={{ fontSize: "18px", margin: "5px 0" }}>
          {weather.charAt(0).toUpperCase() + weather.slice(1)}
        </p>
        <p style={{ fontSize: "24px", fontWeight: "bold", margin: "5px 0" }}>
          {temperature}
        </p>
      </div>

      {/* Water Irrigation Box */}
      <div
        style={{
          backgroundColor: "#e8f5e9",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ color: "#2e7d32", marginTop: "0" }}>Water Irrigation</h3>
        <p style={{ fontSize: "18px", margin: "10px 0" }}>{waterIrrigation}</p>
      </div>
    </div>
  );
};

export default WelcomeSection;