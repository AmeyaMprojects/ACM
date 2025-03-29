import React, { useState } from "react";

export default function Fert() {
  const [soilState, setSoilState] = useState({
    pH: 5.8,
    N: 100,
    P: 70,
    K: 120,
    moisture: "medium",
    soil_type: "loam",
  });

  const [recommendation, setRecommendation] = useState(null);

  const crops = {
    potato: {
      nutrient_needs: { N: 120, P: 80, K: 150 },
      soil_ph_range: [5.0, 6.0],
      intercrop_partners: ["maize"],
      price_per_kg: 22,
    },
    maize: {
      nutrient_needs: { N: 90, P: 50, K: 70 },
      soil_ph_range: [5.5, 7.0],
      intercrop_partners: ["potato", "strawberry"],
      price_per_kg: 20,
    },
    strawberry: {
      nutrient_needs: { N: 70, P: 40, K: 90 },
      soil_ph_range: [5.5, 6.5],
      intercrop_partners: ["maize"],
      price_per_kg: 160,
    },
    apple: {
      nutrient_needs: { N: 50, P: 30, K: 60 },
      soil_ph_range: [6.0, 7.0],
      intercrop_partners: ["strawberry"],
      price_per_kg: 85,
    },
  };

  const fertilizers = {
    Urea: { N: 460, P: 0, K: 0 },
    DAP: { N: 180, P: 460, K: 0 },
    MOP: { N: 0, P: 0, K: 600 },
  };

  const calculateFertilizerRequirements = (crop, soilState) => {
    const requirements = crops[crop].nutrient_needs;
    const deficits = {
      N: Math.max(requirements.N - soilState.N, 0),
      P: Math.max(requirements.P - soilState.P, 0),
      K: Math.max(requirements.K - soilState.K, 0),
    };

    const recommendations = [];
    if (deficits.N > 0) {
      const ureaNeeded = (deficits.N / fertilizers.Urea.N) * 1000;
      recommendations.push(`Urea: ${ureaNeeded.toFixed(1)} kg/ha`);
    }
    if (deficits.P > 0) {
      const dapNeeded = (deficits.P / fertilizers.DAP.P) * 1000;
      recommendations.push(`DAP: ${dapNeeded.toFixed(1)} kg/ha`);
    }
    if (deficits.K > 0) {
      const mopNeeded = (deficits.K / fertilizers.MOP.K) * 1000;
      recommendations.push(`MOP: ${mopNeeded.toFixed(1)} kg/ha`);
    }

    return recommendations;
  };

  const calculateSoilHealthReward = (crop, soilState) => {
    const cropData = crops[crop];
    let reward = 0;

    // pH compatibility
    if (
      cropData.soil_ph_range[0] <= soilState.pH &&
      soilState.pH <= cropData.soil_ph_range[1]
    ) {
      reward += 20;
    } else {
      reward -= 30;
    }

    // Nutrient sufficiency
    for (const nutrient of ["N", "P", "K"]) {
      if (soilState[nutrient] >= cropData.nutrient_needs[nutrient]) {
        reward += nutrient === "N" ? 15 : 10;
      } else {
        reward -= 10;
      }
    }

    return reward;
  };

  const recommendCrop = (soilState) => {
    let bestCrop = null;
    let bestScore = -Infinity;

    for (const crop in crops) {
      const soilHealthScore = calculateSoilHealthReward(crop, soilState);
      if (soilHealthScore > bestScore) {
        bestScore = soilHealthScore;
        bestCrop = crop;
      }
    }

    const intercrop =
      crops[bestCrop].intercrop_partners.length > 0
        ? crops[bestCrop].intercrop_partners[0]
        : "None";

    return {
      crop: bestCrop,
      intercrop,
      price_per_kg: crops[bestCrop].price_per_kg,
      soil_health_score: bestScore,
      fertilizer_recommendations: calculateFertilizerRequirements(
        bestCrop,
        soilState
      ),
    };
  };

  const handleRecommend = () => {
    const result = recommendCrop(soilState);
    setRecommendation(result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Fertilizer and Crop Recommendation</h1>
      <button onClick={handleRecommend}>Get Recommendation</button>
      {recommendation && (
        <div style={{ marginTop: "20px" }}>
          <h2>Recommended Crop: {recommendation.crop}</h2>
          <p>Intercrop With: {recommendation.intercrop}</p>
          <p>Price per kg: ₹{recommendation.price_per_kg}</p>
          <p>Soil Health Score: {recommendation.soil_health_score}</p>
          <h3>Fertilizer Recommendations:</h3>
          <ul>
            {recommendation.fertilizer_recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}