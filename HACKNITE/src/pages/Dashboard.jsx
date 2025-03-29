import React, { useState } from "react";
import WelcomeSection from "../components/WelcomeSection";
import MapComponent from "../components/MapComponent";
import SoilInfo from "../components/SoilInfo";
import MicroclimatePrediction from "../components/MicroclimatePrediction";
import DiagnosisTool from "../components/DiagnosisTool";
import IntercroppingSuggestions from "../components/IntercroppingSuggestions";
import SustainabilityScore from "../components/SustainabilityScore";

let globalCoordinates = null; // Global variable to store coordinates

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [username, setUsername] = useState(""); // State to track username input
  const [password, setPassword] = useState(""); // State to track password input
  const [error, setError] = useState(""); // State to track login errors
  const [currentStep, setCurrentStep] = useState("welcome"); // State to track the current step
  const [activeComponent, setActiveComponent] = useState("WelcomeSection"); // State to track active sidebar component
  const [showSidebar, setShowSidebar] = useState(false); // State to toggle sidebar visibility

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic login validation (replace with real authentication logic if needed)
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      setError(""); // Clear any previous errors
    } else {
      setError("Invalid username or password");
    }
  };

  const handleNext = (coordinates) => {
    if (coordinates) {
      globalCoordinates = coordinates; // Store the coordinates in the global variable
      console.log("Global Coordinates:", globalCoordinates);
    }
    if (currentStep === "welcome") {
      setCurrentStep("map");
    } else if (currentStep === "map") {
      setCurrentStep("soil");
    }
  };

  const handleSoilSubmit = (soilData) => {
    console.log("Soil Data Submitted:", soilData);
    alert("Soil data submitted successfully!");
    setCurrentStep("report"); // Transition to the report generation step
    setShowSidebar(true); // Show the sidebar
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "WelcomeSection":
        return <WelcomeSection />;
      case "MicroclimatePrediction":
        return <MicroclimatePrediction />;
      case "DiagnosisTool":
        return <DiagnosisTool />;
      case "IntercroppingSuggestions":
        return <IntercroppingSuggestions />;
      case "SustainabilityScore":
        return <SustainabilityScore />;
      case "MapComponent":
        return <MapComponent />;
      default:
        return <WelcomeSection />;
    }
  };

  return (
    <div className="dashboard">
      {!isLoggedIn ? (
        <div className="centered-content">
          <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="login-form">
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      ) : currentStep === "welcome" ? (
        <div className="centered-content">
          <WelcomeSection />
          <button
            onClick={() => handleNext()}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#2e7d32",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>
      ) : currentStep === "map" ? (
        <div className="centered-content">
          <MapComponent onCoordinatesSelect={handleNext} />
          <button
            onClick={() => handleNext()}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#2e7d32",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>
      ) : currentStep === "soil" ? (
        <div className="centered-content">
          <SoilInfo onSubmit={handleSoilSubmit} />
        </div>
      ) : (
        <div className="report-dashboard">
          <div className="sidebar">
            <ul>
              <li onClick={() => setActiveComponent("MicroclimatePrediction")}>
                Microclimate Prediction
              </li>
              <li onClick={() => setActiveComponent("DiagnosisTool")}>Diagnosis Tool</li>
              <li onClick={() => setActiveComponent("IntercroppingSuggestions")}>
                Intercropping Suggestions
              </li>
              <li onClick={() => setActiveComponent("SustainabilityScore")}>
                Sustainability Score
              </li>
            </ul>
          </div>
          <div className="main-content">{renderComponent()}</div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;