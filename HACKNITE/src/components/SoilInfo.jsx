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
      onSubmit(soilData);
    }
  };

  // Style for each property box
  const propertyBoxStyle = {
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    padding: "12px 20px",
    margin: "10px",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    flex: "1",
    minWidth: "200px"
  };

  // Style for property labels
  const labelStyle = {
    fontWeight: "600",
    color: "#2e7d32"
  };

  // Style for property values
  const valueStyle = {
    color: "#333",
    fontWeight: "500"
  };

  return (
    <div style={{ overflowX: "hidden" }}> {/* Removed scrollable-container class */}
      <h2 style={{ textAlign: "center", marginBottom: "24px", color: "black" }}>
        SOIL INFORMATION
      </h2>
      <div
        className="soil-info-container"
        style={{ 
          width: "1000px", 
          margin: "0 auto", 
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          overflow: "hidden" // Added to prevent scroll bars
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {/* First Row */}
          <div style={{ display: "flex", width: "100%", gap: "10px" }}>
            <div style={propertyBoxStyle}>
              <span style={labelStyle}>Soil Type:</span>
              <span style={valueStyle}>{soilData.soilType}</span>
            </div>
            <div style={propertyBoxStyle}>
              <span style={labelStyle}>pH Level:</span>
              <span style={valueStyle}>{soilData.phLevel}</span>
            </div>
          </div>
          
          {/* Second Row */}
          <div style={{ display: "flex", width: "100%", gap: "10px" }}>
            <div style={propertyBoxStyle}>
              <span style={labelStyle}>Moisture:</span>
              <span style={valueStyle}>{soilData.moisture}%</span>
            </div>
            <div style={propertyBoxStyle}>
              <span style={labelStyle}>Organic Matter:</span>
              <span style={valueStyle}>{soilData.organicMatter}%</span>
            </div>
          </div>
          
          {/* Third Row */}
          <div style={{ display: "flex", width: "100%", gap: "10px" }}>
            <div style={propertyBoxStyle}>
              <span style={labelStyle}>Nitrogen:</span>
              <span style={valueStyle}>{soilData.nitrogen}%</span>
            </div>
            <div style={propertyBoxStyle}>
              <span style={labelStyle}>Phosphorus:</span>
              <span style={valueStyle}>{soilData.phosphorus}%</span>
            </div>
          </div>
          
          {/* Fourth Row - Single centered box for Potassium */}
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div style={{ ...propertyBoxStyle, maxWidth: "calc(50% - 10px)" }}>
              <span style={labelStyle}>Potassium:</span>
              <span style={valueStyle}>{soilData.potassium}%</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "24px",
            transition: "background-color 0.2s ease"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#1b5e20"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#2e7d32"}
        >
          Submit Soil Data
        </button>
      </div>
    </div>
  );
}

export default SoilInfo;