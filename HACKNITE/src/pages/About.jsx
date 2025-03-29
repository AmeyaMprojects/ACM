import React from "react";

export default function About() {
  return (
    <div className="about-page" style={{ textAlign: "center", padding: "20px" }}>
      <h1>About Us</h1>
      
      
      <p>
        AgriOne is a company that empowers small-scale farmers in India by providing them with 
        personalized recommendations based on their farm's real-time weather conditions, soil 
        moisture, and other environmental factors to optimize farming strategy.
      </p>
      <img src="/India_Farming.jpg" alt="AgriOne Logo" className="img" />
      <h1>Vision For The Future</h1>
      <p>
        Our goal is to build a sustainable and resilient farming community that thrives despite 
        climate challenges. As we grow, we strive to integrate more advanced predictive analytics, 
        expand disease detection capabilities, and foster a connected network of farmers sharing 
        knowledge and experiences. Together, we can revolutionize agriculture—one farm at a time.
      </p>
    </div>
  );
}
