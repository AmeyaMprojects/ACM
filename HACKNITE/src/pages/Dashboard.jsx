import React from 'react';
import WelcomeSection from '../components/WelcomeSection';
import MicroclimatePrediction from '../components/MicroclimatePrediction';
// import UncertaintyMetrics from '../components/UncertaintyMetrics';
import DiagnosisTool from '../components/DiagnosisTool';
import IntercroppingSuggestions from '../components/IntercroppingSuggestions';
// import EthicalAIInsights from '../components/EthicalAIInsights';
// import DisasterResilience from '../components/DisasterResilience';
// import FarmPerformance from '../components/FarmPerformance';
// import ResourceOptimization from '../components/ResourceOptimization';
import SustainabilityScore from '../components/SustainabilityScore';

function App() {
  return (
    <div className="dashboard">
      <WelcomeSection />
      <div className="main-content">
        <MicroclimatePrediction />
        {/* <UncertaintyMetrics /> */}
        <DiagnosisTool />
        <IntercroppingSuggestions />
        {/* <EthicalAIInsights />
        <DisasterResilience />
        <FarmPerformance />
        <ResourceOptimization /> */}
        <SustainabilityScore />
      </div>
    </div>
  );
}

export default App;