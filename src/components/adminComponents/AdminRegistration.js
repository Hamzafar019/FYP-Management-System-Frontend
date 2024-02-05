import React, { useState } from 'react';
const AdminRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [registrationData, setRegistrationData] = useState(null);

  const handleRegistration = async () => {
    try {
      setRegistrationData("")
      setError("")
      // Basic form validation
      if (!name || !email || !password || !confirmPassword || !role) {
        setError('Please fill in all the fields');
        return;
      }

      if (password !== confirmPassword) {
        setError('Password and Confirm Password do not match');
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }
      // Read auth-token from local storage
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3001/user/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': authToken // Include auth-token in the Authorization header
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.message === 'Email is already in use') {
          setError('Email is already in use');
          return
        } else {
          throw new Error('Registration failed');
        }
      }
      const data = await response.json();
      
      const regname = data.name;
      // const regemail = data.email;
      const regrole = data.role;
      setRegistrationData(`Name: ${regname}, Role: ${regrole}`)
      setError("")
      

    } catch (error) {
      setError('Registration failed. Please check your information.');
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="admin-registration-form"  style={{marginTop:"200px",marginLeft:"170px"}}>
      <h1>Registration Form</h1>
      <form>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="coordinator">Coordinator</option>
          <option value="supervisor">Supervisor</option>
          <option value="admin">Admin</option>
        </select>

        <button type="button" onClick={handleRegistration}>
          Register
        </button>

        {registrationData && (
          <div className="success-message">
            <p>Registration successful!</p>
            {/* Print other registration data as needed */}
            <pre>{JSON.stringify(registrationData, null, 2)}</pre>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AdminRegistration
















