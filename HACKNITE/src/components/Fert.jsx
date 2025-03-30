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
    NPK_10_26_26: { N: 100, P: 260, K: 260 },
    Organic: { N: 20, P: 10, K: 15 } // Approximate values for organic matter
  };

  const fertilizerLinks = {
    Urea: "https://www.google.com/search?q=urea+cheapest+fertilizer",
    DAP: "https://www.google.com/search?q=DAP+cheapest+fertilizer&sca_esv=c6956be96ff6aa97&rlz=1C1GEWG_enIN1011IN1012&ei=GHvoZ_3rFvjH4-EPsbS7qQ4&ved=0ahUKEwj916KCsrCMAxX44zgGHTHaLuUQ4dUDCBA&uact=5&oq=DAP+cheapest+fertilizer&gs_lp=Egxnd3Mtd2l6LXNlcnAiF0RBUCBjaGVhcGVzdCBmZXJ0aWxpemVyMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yCxAAGIAEGIYDGIoFMgsQABiABBiGAxiKBTILEAAYgAQYhgMYigUyCxAAGIAEGIYDGIoFMgsQABiABBiGAxiKBTIIEAAYgAQYogRIjBhQmQNYtBZwA3gBkAEAmAHjAaAByxCqAQYwLjEwLjO4AQPIAQD4AQGYAhCgAuARwgIKEAAYsAMY1gQYR8ICBRAAGO8FwgIHECEYoAEYCsICBRAhGJ8FmAMAiAYBkAYIkgcGMy4xMC4zoAfWWA&sclient=gws-wiz-serp#oshopproduct=pid:7226606901015580892,oid:7226606901015580892,iid:15875511492612756663,pvt:hg,pvo:3&oshop=apv&pvs=0",
    MOP: "https://www.google.com/search?q=mop+cheapest+fertilizer&sca_esv=c6956be96ff6aa97&rlz=1C1GEWG_enIN1011IN1012&ei=HXvoZ77JLo_E4-EPurbr0QM&ved=0ahUKEwj-y-uEsrCMAxUP4jgGHTrbOjoQ4dUDCBA&uact=5&oq=mop+cheapest+fertilizer&gs_lp=Egxnd3Mtd2l6LXNlcnAiF21vcCBjaGVhcGVzdCBmZXJ0aWxpemVyMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMgUQABjvBTIFEAAY7wVI9Q5QxwhY9QtwAXgBkAEAmAGBAaAB9AKqAQMwLjO4AQPIAQD4AQGYAgSgAowDwgIKEAAYsAMY1gQYR8ICCBAAGAcYCBgewgILEAAYgAQYhgMYigXCAggQABiiBBiJBcICCBAhGKABGMMEmAMAiAYBkAYIkgcDMS4zoAeCDg&sclient=gws-wiz-serp#oshopproduct=pid:11128095334466023423,oid:11128095334466023423,iid:16796071657120842358,pvt:hg,pvo:3&oshop=apv&pvs=0",
    NPK_10_26_26: "https://www.google.com/search?q=NPK_10_26_26+cheapest+fertlizer&sca_esv=36d1bc09254dbabd&rlz=1C1GEWG_enIN1011IN1012&ei=fXvoZ6_yKt7AjuMPt6DW0A8&ved=0ahUKEwjvpMuysrCMAxVeoGMGHTeQFfoQ4dUDCBA&uact=5&oq=NPK_10_26_26+cheapest+fertlizer&gs_lp=Egxnd3Mtd2l6LXNlcnAiH05QS18xMF8yNl8yNiBjaGVhcGVzdCBmZXJ0bGl6ZXIyBxAhGKABGAoyBxAhGKABGAoyBxAhGKABGApI5iBQ3gdYvh9wAXgBkAEAmAGnAaABxg2qAQQwLjE0uAEDyAEA-AEBmAIOoALYDMICChAAGLADGNYEGEfCAgQQIRgVmAMA4gMFEgExIECIBgGQBgiSBwQxLjEzoAeyPQ&sclient=gws-wiz-serp#oshopproduct=gid:14197905387816503410,mid:576462806808834699,oid:4735473288311110893,iid:3840804513524725871,pvt:hg,pvo:3&oshop=apv&pvs=0",
    Organic: "https://plantlane.com/collections/organic-fertilizers?page=2&srsltid=AfmBOorG5UnspzRP_u-72SHyCNACFrqtlcrhF5iuMJbFzu8eTWQdbpjl"
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
      recommendations.push({
        name: "Urea",
        amount: ureaNeeded.toFixed(1),
        link: fertilizerLinks.Urea
      });
    }
    if (deficits.P > 0) {
      const dapNeeded = (deficits.P / fertilizers.DAP.P) * 1000;
      recommendations.push({
        name: "DAP",
        amount: dapNeeded.toFixed(1),
        link: fertilizerLinks.DAP
      });
    }
    if (deficits.K > 0) {
      const mopNeeded = (deficits.K / fertilizers.MOP.K) * 1000;
      recommendations.push({
        name: "MOP",
        amount: mopNeeded.toFixed(1),
        link: fertilizerLinks.MOP
      });
    }

    // Always recommend some organic matter
    recommendations.push({
      name: "Organic Matter",
      amount: "500-1000",
      link: fertilizerLinks.Organic
    });

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
    <div style={{ 
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "15px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ 
        color: "#2e7d32",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        Fertilizer and Crop Recommendation
      </h2>
      
      <button 
        onClick={handleRecommend}
        style={{
          display: "block",
          width: "100%",
          padding: "12px",
          backgroundColor: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          margin: "20px 0",
          transition: "background-color 0.3s ease"
        }}
      >
        Get Recommendation
      </button>
      
      {recommendation && (
        <div style={{ 
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px"
        }}>
          <h3 style={{ color: "#2e7d32", marginTop: "0" }}>Recommended Crop: 
            <span style={{ textTransform: "capitalize" }}> {recommendation.crop}</span>
          </h3>
          
          <ul style={{ 
            listStyle: "none",
            padding: "0",
            margin: "15px 0"
          }}>
            <li style={{ marginBottom: "10px" }}>
              <strong>Intercrop With:</strong> 
              <span style={{ textTransform: "capitalize" }}> {recommendation.intercrop}</span>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Price per kg:</strong> ₹{recommendation.price_per_kg}
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Soil Health Score:</strong> {recommendation.soil_health_score}
            </li>
          </ul>
          
          <h4 style={{ color: "#2e7d32", marginBottom: "10px" }}>Fertilizer Recommendations:</h4>
          <ul style={{ 
            listStyle: "none",
            padding: "0",
            margin: "15px 0"
          }}>
            {recommendation.fertilizer_recommendations.map((rec, index) => (
              <li key={index} style={{ 
                marginBottom: "8px",
                padding: "8px",
                backgroundColor: "#e8f5e9",
                borderRadius: "5px"
              }}>
                <div>
                  <strong>{rec.name}:</strong> {rec.amount} kg/ha
                </div>
                <a 
                  href={rec.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "4px",
                    fontSize: "14px",
                    color: "#1e88e5",
                    textDecoration: "none"
                  }}
                >
                  Buy {rec.name} at best price
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}