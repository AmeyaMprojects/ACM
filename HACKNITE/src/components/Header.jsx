import React from "react";
import { Link } from "react-router-dom"; // For routing (optional)

export default function Header() {
  return (
    <header className="app-header">
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link> {/* Link to Home page */}
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link> {/* Link to Dashboard page */}
          </li>
          <li>
            <Link to="/about">About Us</Link> {/* Link to About Us page */}
          </li>
        </ul>
      </nav>
    </header>
  );
}