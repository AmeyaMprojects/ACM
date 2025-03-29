import React from 'react';

const SustainabilityScore = () => {
  const score = 85; // Replace with dynamic data
  return (
    <div className="sustainability-score">
      <h2>Sustainability Score: {score}/100</h2>
      <p><strong>Eco-Friendly Practices:</strong> Organic farming, reduced water usage</p>
      <button>Improve Sustainability</button>
    </div>
  );
};

export default SustainabilityScore;