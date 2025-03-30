import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // For routing
import "./index.css"; // Import global styles
import Header from "./components/Header"; // Import the Header component
import Footer from "./components/Footer"; // Import the Footer component
import Home from "./pages/Home"; // Import the Home page
import Dashboard from "./pages/Dashboard"; // Import the Dashboard page
import About from "./pages/About"; // Import the About Us page

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false); // Toggle chatbot visibility

  // State for dynamic chatbot URL
  const [chatbotUrl, setChatbotUrl] = useState(
    "https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/03/29/19/20250329194021-6JJPRBJN.json"
  );

  

  {isChatOpen && (
    <div 
      style={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        width: "350px",
        height: "500px",
        zIndex: "1000",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <iframe
        src={chatbotUrl}
        width="100%"
        height="100%"
        style={{ border: "none", borderRadius: "10px" }}
        title="Chatbot"
        allow="microphone" // ✅ Enable microphone access
        sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
      />
    </div>
  )}



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

        {/* Chatbot Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: "1000",
          }}
          title={isChatOpen ? "Close Chat" : "Open Chat"}
        >
          💬
        </button>

        {/* Chatbot iframe (Visible when chat is open) */}
        {isChatOpen && (
          <div 
            style={{
              position: "fixed",
              bottom: "80px",
              right: "20px",
              width: "350px",
              height: "500px",
              zIndex: "1000",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <iframe
              src={chatbotUrl} // Using the dynamic URL
              width="100%"
              height="100%"
              style={{ border: "none", borderRadius: "10px" }}
              title="Chatbot"
            ></iframe>
          </div>
        )}
      </div>
    </Router>
  );
}