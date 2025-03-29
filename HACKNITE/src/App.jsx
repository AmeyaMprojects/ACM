import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // For routing
import "./index.css"; // Import global styles
import Header from "./components/Header"; // Import the Header component
import Footer from "./components/Footer"; // Import the Footer component
import Home from "./pages/Home"; // Import the Home page
import Dashboard from "./pages/Dashboard"; // Import the Dashboard page
import About from "./pages/About"; // Import the About Us page

export default function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header */}
        <Header />

        {/* Main Content with Routing */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home page */}
            <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page */}
            <Route path="/about" element={<About />} /> {/* About Us page */}
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}