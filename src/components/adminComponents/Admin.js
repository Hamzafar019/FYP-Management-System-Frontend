// src/components/Admin.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminNavSidebar from './AdminNavSidebar';
import AdminHome from './AdminHome';
import AdminRegistration from './AdminRegistration';
import AdminChangePassword from './AdminChangePassword';
import './Admin.css'; // Import the CSS file for custom styles
import ChangePassword from '../ChangePassword';

const Admin = () => {
  return (
    <>
      <Router >
        <AdminNavSidebar/>
        <div className="admin-content">
          <Routes>
            <Route exact path="/admin/" element={<AdminHome />} />
            <Route exact path="/admin/registration" element={<AdminRegistration />} />
            <Route exact path="/changepassword" element={<ChangePassword />} />
            <Route exact path="/admin/adminchangepassword" element={<AdminChangePassword />} />

          </Routes>
        </div>
      </Router>
    </>
  );
};

export default Admin;
