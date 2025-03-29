import React, { useState } from "react";

const cropsData = [
  { name: "Apple", image: "/apple.jpg" },
  { name: "Potato", image: "/potato.jpg" },
  { name: "Maize", image: "/maize.jpg" },
  { name: "Strawberry", image: "/strawberry.jpg" },
];

function Crops({ onSubmit }) {
  const [cropSelection, setCropSelection] = useState({
    Apple: "no",
    Potato: "no",
    Maize: "no",
    Strawberry: "no",
  });

  const handleSelectionChange = (crop, value) => {
    setCropSelection(prev => ({
      ...prev,
      [crop]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCrops = Object.entries(cropSelection)
      .filter(([_, value]) => value === "yes")
      .map(([crop]) => crop);
    
    console.log("Selected Crops:", selectedCrops);
    if (onSubmit) {
      onSubmit(selectedCrops);
    }
    alert("Crops selection submitted successfully!");
  };

  return (
    <div className="crops-container">
      <h2>Select Your Crops</h2>
      <div className="crops-grid">
        {cropsData.map((crop) => (
          <div key={crop.name} className="crop-card">
            <img src={crop.image} alt={crop.name} className="crop-image" />
            <h3>{crop.name}</h3>
            
            <label htmlFor={`${crop.name}-select`}>Do you grow this crop?</label>
            <select
              id={`${crop.name}-select`}
              value={cropSelection[crop.name]}
              onChange={(e) => handleSelectionChange(crop.name, e.target.value)}
              className="crop-select"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
}

export default Crops;