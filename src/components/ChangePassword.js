import React, { useState } from 'react';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') {
      setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match');
      return;
    }

    if (newPassword === oldPassword) {
      setErrorMessage('New and old password should be different');
      return;
    }

    // Show confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to change your password?');
    if (!isConfirmed) {
      return;
    }

    // Fetch auth token from localStorage
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await fetch('http://localhost:3001/user/changePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authToken
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error changing password');
      }

      // Password changed successfully, do something (e.g., redirect)
      console.log('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      setErrorMessage(error.message || 'Error changing password. Please try again.');
    }
  };

  return (
    <div className='login-form'>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Old Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="oldPassword"
            value={oldPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={handleCheckboxChange}
          />
          Show Password
        </label>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
