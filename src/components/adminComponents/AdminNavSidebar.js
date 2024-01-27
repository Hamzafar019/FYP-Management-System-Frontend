// src/components/AdminNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';


const AdminNavSidebar = () => {

  
  return (
    <div id='navsidebar'>
    <nav>
      <ul style={{ marginTop: '80px' }}>
        <li>
          <Link to="/admin">Home</Link>
        </li>
        <li>
          <Link to="/admin/registration">Registration</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default AdminNavSidebar;
