import React, { useState } from 'react';
import WelcomeSection from '../components/WelcomeSection';
import MicroclimatePrediction from '../components/MicroclimatePrediction';
import DiagnosisTool from '../components/DiagnosisTool';
import IntercroppingSuggestions from '../components/IntercroppingSuggestions';
import SustainabilityScore from '../components/SustainabilityScore';
import MapComponent from '../components/MapComponent'; // Import the Map Selector Component

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('WelcomeSection');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'WelcomeSection':
        return <WelcomeSection />;
      case 'MicroclimatePrediction':
        return <MicroclimatePrediction />;
      case 'DiagnosisTool':
        return <DiagnosisTool />;
      case 'IntercroppingSuggestions':
        return <IntercroppingSuggestions />;
      case 'SustainabilityScore':
        return <SustainabilityScore />;
      case 'MapComponent': // Add case for Map Selector Component
        return <MapComponent />;
      default:
        return <WelcomeSection />;
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li onClick={() => setActiveComponent('WelcomeSection')}>Welcome Section</li>
          <li onClick={() => setActiveComponent('MicroclimatePrediction')}>Microclimate Prediction</li>
          <li onClick={() => setActiveComponent('DiagnosisTool')}>Diagnosis Tool</li>
          <li onClick={() => setActiveComponent('IntercroppingSuggestions')}>Intercropping Suggestions</li>
          <li onClick={() => setActiveComponent('SustainabilityScore')}>Sustainability Score</li>
          <li onClick={() => setActiveComponent('MapComponent')}>Map Selector</li> {/* Add Map Selector to Sidebar */}
        </ul>
      </div>
      <div className="main-content">{renderComponent()}</div>
    </div>
  );
}

export default Dashboard;