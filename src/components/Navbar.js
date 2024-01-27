// Navbar.js
import React from 'react';
import '../CSS/Navbar.css';

const Navbar = ({ onSignUpClick }) => {
  const handleSignUpClick = () => {
    if (onSignUpClick) {
      onSignUpClick();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span>Logo</span>
        </div>
        <div className="navbar-actions">
          <button className="signup-button" onClick={handleSignUpClick}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
