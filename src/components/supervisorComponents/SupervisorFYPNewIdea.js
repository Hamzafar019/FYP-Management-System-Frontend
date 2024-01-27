import React, { useState } from 'react';

const SupervisorFYPNewIdea = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  const [error, setError] = useState('');
  const [registrationData, setRegistrationData] = useState(null);

  const submitFYPidea = () => {
    setError('')
    setRegistrationData('')
    // Check if title and content are not empty
    if (!title || !description) {
        setError('Title or description cannot be empty.');
      return;
    }

    // Create announcement data
    const FYP_idea = {
      title,
      description,
    };

    // Make a POST request to the backend
    fetch('http://localhost:3001/FYP_idea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': `${authToken}`,
      },
      body: JSON.stringify(FYP_idea),
    })
      .then((response) => {
        if (!response.ok) {
          
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRegistrationData('FYP idea posted successfully:', data)
      })
      .catch((error) => {
        setError('Error posting FYP idea')
      });
  };

  return (
    <div className='admin-registration-form'>
      <h2>FYP IDEA Form</h2>
      <form>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <br />

        <label htmlFor="description">Desciption:</label>
        <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required></textarea>
        <br />

        <button type="button" onClick={submitFYPidea}>Submit</button>
        {registrationData && (
          <div className="success-message">
            {/* Print other registration data as needed */}
            <pre>{JSON.stringify(registrationData, null, 2)}</pre>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default SupervisorFYPNewIdea;

