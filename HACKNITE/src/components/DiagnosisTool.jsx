import React, { useState } from 'react';

const DiagnosisTool = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <div className="diagnosis-tool">
      <h2>Voice/Image-Based Diagnosis</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded crop" />}
      <p><strong>Analysis:</strong> Pest detected - Use pesticide X</p>
      <button>Get Treatment Plan</button>
    </div>
  );
};

export default DiagnosisTool;