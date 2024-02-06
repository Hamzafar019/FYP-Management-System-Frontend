// Navbar.js
import React, { useState, useEffect } from 'react';
import '../CSS/Navbar.css';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const Navbar = ({ onSignOutClick }) => {
  const handleSignUpClick = () => {
    if (onSignOutClick) {
      onSignOutClick();
    }
  };

  const [message, setMessage] = useState('s');

  useEffect(() => {
    
  const socket = io('http://localhost:3001'); 

    
      // Listen for 'chat message' events from the server
      socket.on('bothannouncement', (announcement) => {
          setMessage(message => [...message, announcement]);

      });

      // Clean up the socket connection on component unmount
      return () => {
          socket.disconnect();
      };

      
  }, []); 

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span>Logo</span>
        </div>
        <p>{message}</p>
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
