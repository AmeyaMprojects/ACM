import React, { useState } from "react";

const cropsData = [
  { name: "Apple", image: "/images/apple.jpg" },
  { name: "Potato", image: "/images/potato.jpg" },
  { name: "Maize", image: "/images/maize.jpg" },
  { name: "Strawberry", image: "/images/strawberry.jpg" },
];

function Crops({ onSubmit }) {
  const [acres, setAcres] = useState({
    Apple: 0,
    Potato: 0,
    Maize: 0,
    Strawberry: 0,
  });

  const handleInputChange = (crop, value) => {
    setAcres((prevAcres) => ({
      ...prevAcres,
      [crop]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Crops Data Submitted:", acres);
    if (onSubmit) {
      onSubmit(acres); // Pass the data to the parent component
    }
    alert("Crops data submitted successfully!");
  };

  return (
    <div className="crops-container">
      <h2>Select Your Crops</h2>
      <div className="crops-grid">
        {cropsData.map((crop) => (
          <div key={crop.name} className="crop-card">
            <img src={crop.image} alt={crop.name} className="crop-image" />
            <h3>{crop.name}</h3>
            <label htmlFor={`${crop.name}-acres`}>Acres:</label>
            <input
              type="number"
              id={`${crop.name}-acres`}
              value={acres[crop.name]}
              onChange={(e) => handleInputChange(crop.name, e.target.value)}
              min="0"
              placeholder="Enter acres"
            />
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