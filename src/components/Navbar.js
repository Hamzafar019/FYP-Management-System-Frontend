// Navbar.js
import React from 'react';
import '../CSS/Navbar.css';

const Navbar = ({ onSignOutClick }) => {
  const handleSignUpClick = () => {
    if (onSignOutClick) {
      onSignOutClick();
    }
  };



  const handleChangePassword = () => {
    window.location.href = '/changepassword';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span>Logo</span>
        </div>
        
        <div id="navbar-buttons"> 

        <div className="navbar-actions">
          <button className="changepassword-button" onClick={handleChangePassword}>
            ChangePassword
          </button>
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
