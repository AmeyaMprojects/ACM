import React, { useState } from "react";

const DiagnosisTool = () => {
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Display the uploaded image
    setImage(URL.createObjectURL(file));

    // Prepare form data for upload
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Send the image to the backend for prediction
      const response = await fetch("http://localhost:5000/api/predict-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process the image.");
      }

      // Get the prediction result
      const result = await response.json();
      setAnalysis(`Predicted Class: ${result.class_name}, Confidence Score: ${result.confidence}`);
    } catch (error) {
      console.error("Error uploading image:", error);
      setAnalysis("Error analyzing the image. Please try again.");
    }
  };

  return (
    <div className="diagnosis-tool">
      <h2>Voice/Image-Based Diagnosis</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded crop" style={{ width: "200px", height: "200px" }} />}
      <p><strong>Analysis:</strong> {analysis || "No analysis yet."}</p>
      <button>Get Treatment Plan</button>
    </div>
  );
};

export default DiagnosisTool;