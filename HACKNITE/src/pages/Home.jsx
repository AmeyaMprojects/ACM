import React from "react";
import MapComponent from "../components/MapComponent"; // Import the Map component

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>EMPOWERING FARMERS <br/> WITH AI</h1>

        </section>


        <div className="container">
      <section className="info-section">
        <h1>Optimizing Agriculture with AI</h1>
        <div className="cards">
          <div className="card">
            <h2>Agriculture Analytics</h2>
            <p>AI-driven insights for yield prediction, soil health tracking, and resource optimization.</p>
          </div>
          <div className="card">
            <h2>Agriculture Boost</h2>
            <p>Machine learning-powered recommendations for better farming practices and crop resilience.</p>
          </div>
          <div className="card">
            <h2>Intelligent Agriculture</h2>
            <p>Smart monitoring of environmental factors for sustainable farming decisions.</p>
          </div>
        </div>
      </section>

      <section className="empowering">
        <h2>Empowering Farmers</h2>
        <div className="empowering-content">
          <img src="plumeria-hawaii.jpg" alt="Flower in field" className="empowering-img"/>
          <div className="empowering-text">
            <h3>Harnessing AI for Sustainable Farming</h3>
            <p>AI-driven insights help farmers make informed decisions based on real-time data.</p>
            <h3>Unlocking Insights for Smarter Decisions</h3>
            <p>Analyze probabilities and uncertainties to enhance yield outcomes.</p>
          </div>
        </div>
      </section>

      <section className="cultivating">
        <div className="cultivating-content">
          <h2>Cultivating a Revolution</h2>
          <p>Empowering smallholder farmers with AI-driven tools for better decision-making and resource management.</p>
          <img src="soil_plant.jpg" alt="Growing Plant" className="cultivating-img"/>
        </div>
      </section>
    </div>
    


      {/* Map Section */}
      {/* <section className="map-section">
        <h2>Select a Location</h2>
        <MapComponent />
      </section> */}
    </div>
  );
}