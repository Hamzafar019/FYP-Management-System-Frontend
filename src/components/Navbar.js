import React, { useState, useEffect } from "react";
import "../CSS/Navbar.css";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const Navbar = ({ onSignOutClick }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unseenNotifications, setUnseenNotifications] = useState([]);
  const [viewedNotifications, setViewedNotifications] = useState([]);
  const authToken = localStorage.getItem('authToken');
  const name = localStorage.getItem('name');

  useEffect(() => {
    fetch('http://localhost:3001/notifications', {
      headers: {
        authToken: authToken,
      },
    })
      .then(response => response.json())
      .then(data => {
        setNotifications(data);
        const unseen = data.filter(notification => notification.view === 'no').reverse();
        const viewed = data.filter(notification => notification.view === 'yes').reverse();
        setUnseenNotifications(unseen);
        setViewedNotifications(viewed);
      })
      .catch(error => console.error('Error fetching notifications:', error));
  }, [authToken]);

  const handleSignUpClick = () => {
    if (onSignOutClick) {
      onSignOutClick();
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClick = (id, view) => {
    // Decrement notification count
    if (view === 'no') {
      const viewedNotification = unseenNotifications.find(notification => notification.id === id);
      if (viewedNotification) {
        setViewedNotifications([viewedNotification, ...viewedNotifications]);
    }
    
      setUnseenNotifications(unseenNotifications.filter(notification => notification.id !== id));
    } else {
      // setViewedNotifications(viewedNotifications.filter(notification => notification.id !== id));
    }
    // Send PUT request to update notification status
    fetch(`http://localhost:3001/notifications?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authToken: authToken,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update notification status');
        }
      })
      .catch(error => console.error('Error updating notification status:', error));
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span>Logo</span>
        </div>
        <div id="navbar-buttons">
          <div className="navbar-actions" style={{color:"white",marginRight:"30px"}}>
            Hi, {name}
          </div>
          <div className="navbar-actions">
            <button className="notification-button" onClick={toggleNotifications}>
              <FaBell />
              {(unseenNotifications.length ) > 0 && (
                <span className="notification-badge">{unseenNotifications.length }</span>
              )}
            </button>




            {showNotifications && (
  <div className="notifications-dropdown" style={{ maxHeight: "700px", overflowY: "auto" }}>
    {/* Display unseen notifications */}
    <p style={{textAlign:"center",color:"black",fontWeight:"bold",marginBottom:"10px"}}>New</p>
    {unseenNotifications.map(notification => (
      <Link
        key={notification.id}
        to={notification.route}
        className="notification-item unseen"
        onClick={() => handleNotificationClick(notification.id, 'no')}
      >
        {notification.text} <br></br> Date&Time: {new Date(notification.createdAt).toLocaleString()} 
      </Link>
    ))}
    <p style={{textAlign:"center",color:"black",fontWeight:"bold",marginBottom:"10px"}}>Earlier</p>
    {/* Display viewed notifications */}
    {viewedNotifications.map(notification => (
      <Link
        key={notification.id}
        to={notification.route}
        className="notification-item viewed"
        onClick={() => handleNotificationClick(notification.id, 'yes')}
      >
        {notification.text} <br></br> Date&Time: {new Date(notification.createdAt).toLocaleString()} 
      </Link>
    ))}
  </div>
)}





          </div>
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
