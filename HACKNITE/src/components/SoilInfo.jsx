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

  return (
    <div className="soil-info-container">
      <h2>Enter Soil Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Soil Type */}
        <label>Soil Type:</label>
        <select value={soilType} onChange={(e) => setSoilType(e.target.value)} required>
          <option value="">Select Soil Type</option>
          <option value="Clay">Clay</option>
          <option value="Sandy">Sandy</option>
          <option value="Loamy">Loamy</option>
        </select>

        {/* pH Level */}
        <label>pH Level (0 - 14):</label>
        <input type="number" value={phLevel} onChange={(e) => setPhLevel(e.target.value)} min="0" max="14" step="0.1" required />

        {/* Moisture */}
        <label>Moisture (%) :</label>
        <input type="number" value={moisture} onChange={(e) => setMoisture(e.target.value)} min="0" max="100" step="0.1" required />

        {/* Organic Matter */}
        <label>Organic Matter (%) :</label>
        <input type="number" value={organicMatter} onChange={(e) => setOrganicMatter(e.target.value)} min="0" max="100" step="0.1" required />

        {/* Nitrogen */}
        <label>Nitrogen (mg/kg) :</label>
        <input type="number" value={nitrogen} onChange={(e) => setNitrogen(e.target.value)} min="0" required />

        {/* Phosphorus */}
        <label>Phosphorus (mg/kg) :</label>
        <input type="number" value={phosphorus} onChange={(e) => setPhosphorus(e.target.value)} min="0" required />

        {/* Potassium */}
        <label>Potassium (mg/kg) :</label>
        <input type="number" value={potassium} onChange={(e) => setPotassium(e.target.value)} min="0" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SoilInfo;
