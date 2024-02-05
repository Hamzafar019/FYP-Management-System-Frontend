// Navbar.js
import React from 'react';
import '../CSS/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ onSignOutClick }) => {
  const handleSignUpClick = () => {
    if (onSignOutClick) {
      onSignOutClick();
    }
  };




  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span>Logo</span>
        </div>
        
        <div id="navbar-buttons"> 

        <div className="navbar-actions">
        <Link to="/changepassword" className="changepassword-button">
        Change Password
      </Link>
        </div>
        <div className="navbar-actions">
          
          <button className="signout-button" onClick={handleSignUpClick}>
            Sign Out
          </button>
        </div>
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
