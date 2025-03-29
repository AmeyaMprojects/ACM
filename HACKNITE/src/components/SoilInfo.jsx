import React, { useState } from "react";

const SoilInfo = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    salinity: "",
    ph: "",
    temperature: "",
    humidity: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    soilType: "", // New field for soil type
    moisture: "", // New field for moisture
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Soil Information Submitted:", formData);
    if (onSubmit) {
      onSubmit(formData); // Pass the form data to the parent component
    }
    alert("Soil information submitted successfully!");
    setFormData({
      salinity: "",
      ph: "",
      temperature: "",
      humidity: "",
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      soilType: "",
      moisture: "",
    });
  };

  return (
    <div className="soil-info-form">
      <h2>Soil Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="salinity">Salinity:</label>
          <input
            type="number"
            id="salinity"
            name="salinity"
            value={formData.salinity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ph">pH:</label>
          <input
            type="number"
            id="ph"
            name="ph"
            value={formData.ph}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="temperature">Temperature (°C):</label>
          <input
            type="number"
            id="temperature"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="humidity">Humidity (%):</label>
          <input
            type="number"
            id="humidity"
            name="humidity"
            value={formData.humidity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nitrogen">Nitrogen Content (N):</label>
          <input
            type="number"
            id="nitrogen"
            name="nitrogen"
            value={formData.nitrogen}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phosphorus">Phosphorus Content (P):</label>
          <input
            type="number"
            id="phosphorus"
            name="phosphorus"
            value={formData.phosphorus}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="potassium">Potassium Content (K):</label>
          <input
            type="number"
            id="potassium"
            name="potassium"
            value={formData.potassium}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="soilType">Soil Type:</label>
          <select
            id="soilType"
            name="soilType"
            value={formData.soilType}
            onChange={handleChange}
            required
          >
            <option value="">Select Soil Type</option>
            <option value="sandy">Sandy</option>
            <option value="clay">Clay</option>
            <option value="silt">Silt</option>
            <option value="loamy">Loamy</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="moisture">Moisture (%):</label>
          <input
            type="number"
            id="moisture"
            name="moisture"
            value={formData.moisture}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SoilInfo;