// components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        {/* Empty div to push nav to the right */}
        <img src="/logo.jpeg" alt="AgriOne Logo" className="logo" />
        <div></div>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/about" className="nav-link">About Us</Link>
        </nav>
      </div>
    </header>
  );
}