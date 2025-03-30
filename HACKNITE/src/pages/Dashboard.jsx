import React, { useState } from "react";
import WelcomeSection from "../components/WelcomeSection";
import MapComponent from "../components/MapComponent";
import SoilInfo from "../components/SoilInfo";
import Crops from "../components/Crops";
import MicroclimatePrediction from "../components/MicroclimatePrediction";
import DiagnosisTool from "../components/DiagnosisTool";
import IntercroppingSuggestions from "../components/IntercroppingSuggestions";
import SustainabilityScore from "../components/SustainabilityScore";
import Fert from "../components/Fert"; // Import the Fert component
import { WiDayCloudy } from "react-icons/wi";
import { FaStethoscope } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { GiPlantRoots } from "react-icons/gi";


let globalCoordinates = null; // Global variable to store coordinates



function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [username, setUsername] = useState(""); // State to track username input
  const [password, setPassword] = useState(""); // State to track password input
  const [error, setError] = useState(""); // State to track login errors
  const [activeComponent, setActiveComponent] = useState("WelcomeSection"); // State to track active sidebar component
  const [showSidebar, setShowSidebar] = useState(false); // State to toggle sidebar visibility
  const [currentStep, setCurrentStep] = useState("login"); // Track the current step
  const [coordinates, setCoordinates] = useState(null); // Store selected coordinates

  

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic login validation (replace with real authentication logic if needed)
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      setError(""); // Clear any previous errors
      setCurrentStep("map"); // Move to the map step after login
    } else {
      setError("Invalid username or password");
    }
  };

  const handleNext = (coordinates) => {
    if (coordinates) {
      globalCoordinates = coordinates; // Store the coordinates in the global variable
      console.log("Global Coordinates:", globalCoordinates);
    }
    if (currentStep === "map") {
      setCurrentStep("welcome"); // Move to the welcome step after the map
    } else if (currentStep === "welcome") {
      setCurrentStep("soil");
    } else if (currentStep === "soil") {
      setCurrentStep("crops");
    }
  };

  const handleSoilSubmit = (soilData) => {
    console.log("Soil Data Submitted:", soilData);
    alert("Soil data submitted successfully!");
    setCurrentStep("crops"); // Transition to the crops step
  };

  const handleCropsSubmit = (cropsData) => {
    console.log("Crops Data Submitted:", cropsData);
    alert("Crops data submitted successfully!");
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
      case "Fert": // Add Fert as a case
        return <Fert />;
      case "MapComponent":
        return <MapComponent />;
      default:
        return <WelcomeSection />;
    }
  };

  return (
    <div className="dashboard">
      {currentStep === "login" ? (
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
      ) : currentStep === "welcome" ? (
        <div className="centered-content">
          <WelcomeSection />
          <button
            className="next-button"
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
      ) : currentStep === "crops" ? (
        <div className="centered-content">
          <Crops onSubmit={handleCropsSubmit} />
        </div>
      ) : (
        <div className="report-dashboard">
         <div className="sidebar">
      <ul>
        <li className="sidebar-item" onClick={() => setActiveComponent("MicroclimatePrediction")}>
          <WiDayCloudy style={{ marginRight: "10px" }} /> Microclimate Prediction
        </li>
        <li className="sidebar-item" onClick={() => setActiveComponent("DiagnosisTool")}>
          <FaStethoscope  style={{ marginRight: "10px" }}/> Diagnosis Tool
        </li>
        <li className="sidebar-item" onClick={() => setActiveComponent("IntercroppingSuggestions")}>
          <MdAnalytics style={{ marginRight: "10px" }} /> InfoMetrics
        </li>
        <li className="sidebar-item" onClick={() => setActiveComponent("Fert")}>
          <GiPlantRoots style={{ marginRight: "10px" }} /> Fertilizer Recommendations
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