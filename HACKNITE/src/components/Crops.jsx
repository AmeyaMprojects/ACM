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
    setCropSelection((prev) => ({
      ...prev,
      [crop]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const selectedCrops = Object.entries(cropSelection)
      .filter(([_, value]) => value === "yes")
      .map(([crop]) => crop);

    console.log("Selected Crops:", selectedCrops);
    if (onSubmit) {
      onSubmit(selectedCrops);
    }
    alert("Crops selection submitted successfully!"); // Ensure only one alert is shown
  };

  return (
    <div>
      {/* Title outside the selection box */}
      <div className="title-container">
        <h2>Select Your Crops</h2>
      </div>

      {/* Crop selection container */}
      <form onSubmit={handleSubmit} className="crops-container">
        <div className="crops-grid">
          {cropsData.map((crop) => (
            <div key={crop.name} className="crop-card">
              <img src={crop.image} alt={crop.name} className="crop-image" />
              <h3>{crop.name}</h3>

              <label htmlFor={`${crop.name}-select`}>
                Do you grow this crop?
              </label>
              <select
                id={`${crop.name}-select`}
                value={cropSelection[crop.name]}
                onChange={(e) =>
                  handleSelectionChange(crop.name, e.target.value)
                }
                className="crop-select"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Crops;