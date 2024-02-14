import React, { useState } from 'react';

const CoordinatorDomains = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setSuccess('')
        setError('')
        if (!title) {
            setError('Domain is required.');
          return;
        }
      const response = await fetch('http://localhost:3001/domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': `${authToken}`
        },
        body: JSON.stringify({ title }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setSuccess(data.domainname);
      setTitle('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='admin-registration-form' style={{marginTop:"200px",marginLeft:"170px"}}>
      <h2 style={{marginBottom:"15px"}}>Video Domain Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Domain Title"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error-message">Error: {error}</p>}
      {success && <p className="success-message">Domain added: {success}</p>}
    </div>
  );
};

export default CoordinatorDomains;
