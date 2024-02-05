// src/components/AdminNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';


const AdminNavSidebar = () => {

  
  return (
    <div id='navsidebar'>
    <nav>
      <ul style={{ marginTop: '80px' }}>
          <Link to="/admin">- Home</Link>
      

    
          <Link to="/admin/registration">- Registration</Link>
       

        <Link to="/admin/adminchangepassword">- Change User Password</Link>


        
      </ul>
    </nav>
    </div>
  );
};

export default AdminNavSidebar;
