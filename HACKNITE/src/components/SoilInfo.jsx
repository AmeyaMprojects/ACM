import React, { useState } from "react";

function SoilInfo({ onSubmit }) {
  const [soilType, setSoilType] = useState("");
  const [phLevel, setPhLevel] = useState("");
  const [moisture, setMoisture] = useState("");
  const [organicMatter, setOrganicMatter] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ soilType, phLevel, moisture, organicMatter, nitrogen, phosphorus, potassium });
  };

  // Unified styling for all form controls
  const formControlStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0 16px 0",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxSizing: "border-box",
    fontSize: "16px",
    backgroundColor: "#fff",
    height: "48px" // Fixed height for all controls
  };

  const labelStyle = {
    fontWeight: "500",
    fontSize: "15px",
    color: "#333"
  };

  return (
    < div className="scrollable-container">
    <div className="soil-info-container" style={{ maxWidth: "500px", margin: "0 auto", padding: "24px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "24px", color: "#2c3e50" }}>Enter Soil Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Soil Type - Now matches input dimensions */}
        <label style={labelStyle}>Soil Type:</label>
        <select 
          style={formControlStyle}
          value={soilType} 
          onChange={(e) => setSoilType(e.target.value)} 
          required
        >
          <option value="">Select Soil Type</option>
          <option value="Clay">Clay</option>
          <option value="Sandy">Sandy</option>
          <option value="Loamy">Loamy</option>
        </select>

        {/* pH Level */}
        <label style={labelStyle}>pH Level (0-14):</label>
        <input 
          type="number" 
          style={formControlStyle}
          value={phLevel} 
          onChange={(e) => setPhLevel(e.target.value)} 
          min="0" 
          max="14" 
          step="0.1" 
          required 
        />

        {/* All other input fields with same style */}
        <label style={labelStyle}>Moisture (%):</label>
        <input 
          type="number" 
          style={formControlStyle}
          value={moisture} 
          onChange={(e) => setMoisture(e.target.value)} 
          min="0" 
          max="100" 
          step="0.1" 
          required 
        />

        {/* ... (other input fields with same formControlStyle) ... */}
        <label style={labelStyle}>Organic Matter (%):</label>
        <input 
          type="number" 
          style={formControlStyle}
          value={organicMatter} 
          onChange={(e) => setOrganicMatter(e.target.value)} 
          min="0" 
          max="100" 
          step="0.1" 
          required
        ></input>

        <label style={labelStyle}>Nitrogen (%):</label>
        <input 
          type="number" 
          style={formControlStyle}
          value={nitrogen} 
          onChange={(e) => setNitrogen(e.target.value)} 
          min="0" 
          max="100" 
          step="0.1" 
          required
          ></input>

        <label style={labelStyle}>Phosphorus (%):</label>
        <input 
          type="number" 
          style={formControlStyle}
          value={phosphorus} 
          onChange={(e) => setPhosphorus(e.target.value)} 
          min="0" 
          max="100" 
          step="0.1" 
          required
        ></input>

        <label style={labelStyle}>Potassium (%):</label>
        <input 
          type="number" 
          style={formControlStyle}
          value={potassium} 
          onChange={(e) => setPotassium(e.target.value)} 
          min="0" 
          max="100" 
          step="0.1" 
          required
        ></input>


        <button 
          type="submit"
          style={{
            ...formControlStyle,
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "24px",
            fontSize: "16px",
            fontWeight: "600",
            height: "52px" // Slightly taller button
          }}
        >
          Submit Soil Data
        </button>
      </form>
    </div>
    </div>
  );
}

export default SoilInfo;