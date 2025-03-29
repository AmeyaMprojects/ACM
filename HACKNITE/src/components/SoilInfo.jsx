import React from "react";

function SoilInfo({ onSubmit }) {
  // Hardcoded soil information
  const soilData = {
    soilType: "Loamy",
    phLevel: 6.5,
    moisture: 45,
    organicMatter: 12,
    nitrogen: 3,
    phosphorus: 2,
    potassium: 1.5,
  };

  const handleSubmit = () => {
    console.log("Hardcoded Soil Data Submitted:", soilData);
    if (onSubmit) {
      onSubmit(soilData); // Pass the hardcoded data to the parent component
    }
  };

  return (
    <div className="scrollable-container">
      <div
        className="soil-info-container"
        style={{ maxWidth: "500px", margin: "0 auto", padding: "24px" }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px", color: "#2c3e50" }}>
          Soil Information
        </h2>
        <div style={{ textAlign: "left", fontSize: "16px", lineHeight: "1.8" }}>
          <p><strong>Soil Type:</strong> {soilData.soilType}</p>
          <p><strong>pH Level:</strong> {soilData.phLevel}</p>
          <p><strong>Moisture (%):</strong> {soilData.moisture}</p>
          <p><strong>Organic Matter (%):</strong> {soilData.organicMatter}</p>
          <p><strong>Nitrogen (%):</strong> {soilData.nitrogen}</p>
          <p><strong>Phosphorus (%):</strong> {soilData.phosphorus}</p>
          <p><strong>Potassium (%):</strong> {soilData.potassium}</p>
        </div>
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "24px",
          }}
        >
          Submit Soil Data
        </button>
      </div>
    </div>
  );
}

export default SoilInfo;