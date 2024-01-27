// src/components/LoginForm.js

// import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../CSS/LoginForm.css'; 
// import {useNavigate} from 'react-router-dom'
// ... (your imports and component definition)

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Basic form validation
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }

      // You can add more specific validation checks here, e.g., for email format, password length, etc.
      // For simplicity, let's just check if the email has the right format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }

      const response = await fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const userRole = data.role;
      const authToken = data.token;
      
      localStorage.setItem('authToken', authToken);
      onLogin(userRole);
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-form">
      <h1>Login Form</h1>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleLogin}>
          Login
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
