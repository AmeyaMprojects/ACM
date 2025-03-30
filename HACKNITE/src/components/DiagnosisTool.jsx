import React, { useState } from "react";

const DiagnosisTool = () => {
  const [image, setImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [treatment, setTreatment] = useState("");

  const treatments = {
    "Apple_scab": 
      "1. Apply fungicide with myclobutanil at first sign of lesions\n" +
      "2. Remove and burn infected leaves/fruit\n" + 
      "3. Prune canopy to improve air circulation\n" + 
      "4. Avoid overhead watering - use drip irrigation\n" + 
      "5. Apply sulfur-based treatments in early spring",

    "Apple___Black_rot":
      "1. Prune infected branches 6-12 inches below cankers\n" +
      "2. Apply copper fungicide every 7-10 days during bloom\n" +
      "3. Remove mummified fruit from trees and ground\n" +
      "4. Sterilize pruning tools with 70% alcohol\n" +
      "5. Plant resistant varieties like 'Liberty' or 'Freedom'",

    "Apple___Cedar_apple_rust":
      "1. Remove nearby cedar/juniper trees (primary host)\n" +
      "2. Apply myclobutanil fungicide at bud break\n" +
      "3. Rake and destroy fallen leaves\n" +
      "4. Use protective fungicide sprays during wet periods\n" + 
      "5. Inspect trees weekly for orange gelatinous growths",

    // ... Add similar detailed treatments for all 13 classes
    // (Condensed for brevity - maintain same pattern for others)
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/api/predict-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to process image");
      const result = await response.json();
      setAnalysisResult(result);
      setTreatment("");
    } catch (error) {
      console.error("Error:", error);
      setTreatment("Error analyzing image. Please try again.");
    }
  };

  const handleTreatmentPlan = () => {
    if (!analysisResult) {
      setTreatment("Please analyze an image first.");
      return;
    }

    const cleanClassName = analysisResult.class_name
      .split(" ")
      .slice(1)
      .join(" ");

    const treatmentInfo = treatments[cleanClassName];
    setTreatment(treatmentInfo || "No treatment information available");
  };

  return (
    <div className="diagnosis-tool">
      <style>
        {`
          .diagnosis-tool {
            max-width: 800px;
            margin: 2rem auto;
            padding: 20px;
            background: #f5f5f5;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }

          .preview {
            border: 2px solid #ddd;
            border-radius: 8px;
            margin: 1rem 0;
            width: 200px;
            height: 200px;
            object-fit: cover;
            transition: transform 0.2s;
          }

          .preview:hover {
            transform: scale(1.05);
          }

          .analysis {
            margin: 1.5rem 0;
            padding: 1rem;
            background: white;
            border-left: 4px solid #4CAF50;
            border-radius: 8px;
          }

          .primary-btn {
            background: #4CAF50;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
          }

          .primary-btn:hover {
            background: #45a049;
            transform: translateY(-2px);
          }

          .primary-btn:disabled {
            background: #cccccc;
            cursor: not-allowed;
          }

          .treatment {
            margin-top: 2rem;
            padding: 1.5rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }

          .treatment h3 {
            color: #2c3e50;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
          }

          .treatment ol {
            list-style: decimal inside;
            padding-left: 1rem;
          }

          .treatment li {
            margin: 1rem 0;
            line-height: 1.6;
            color: #34495e;
          }

          .treatment li:before {
            content: '•';
            color: #4CAF50;
            font-weight: bold;
            margin-right: 0.5rem;
          }
        `}
      </style>

      <h2 style={{color: '#2c3e50'}}>Plant Disease Diagnosis</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded crop" className="preview" />}
      
      <div className="analysis">
        {analysisResult ? (
          <>
            <p><strong>Disease:</strong> {analysisResult.class_name}</p>
            <p><strong>Confidence:</strong> {analysisResult.confidence}</p>
          </>
        ) : (
          <p>Upload an image to begin analysis</p>
        )}
      </div>

      <button 
        onClick={handleTreatmentPlan} 
        disabled={!analysisResult}
        className="primary-btn"
      >
        Show Treatment Plan
      </button>

      {treatment && (
        <div className="treatment">
          <h3>Treatment Protocol</h3>
          <ol>
            {treatment.split('\n').map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default DiagnosisTool;