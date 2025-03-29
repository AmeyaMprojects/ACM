import React from 'react';

const WelcomeSection = () => {
  const farmerName = "RAJU"; // Replace with dynamic data
  return (
    <div className="welcome-section">
      <h1>Good Morning, {farmerName}!</h1>
      <div className="farm-summary">
        <p><strong>Weather Forecast:</strong> Sunny, 25°C</p>
        <p><strong>Water Usage:</strong> Irrigation needed today</p>
        <p><strong>Pest Risk:</strong> Low risk detected</p>
        <p><strong>Intercropping Suggestion:</strong> Maize + Legumes</p>
        <p><strong>Early Warning:</strong> No alerts</p>
      </div>
    </div>
  );
};

export default WelcomeSection;