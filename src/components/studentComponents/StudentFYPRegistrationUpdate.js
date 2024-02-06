import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
const StudentFYPRegistrationUpdate = () => {
    
  const { projectId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  const [error, setError] = useState('');
  const [registrationData, setRegistrationData] = useState(null);

  const FYPregister = () => {
    setError('')
    setRegistrationData('')
    // Check if title and content are not empty
    if (!title || !description) {
        setError('Title or description should be included.');
      return;
    }
    const FYP_registration={
        
        title,
        description,
    }    

    // Make a POST request to the backend
    fetch(`http://localhost:3001/FYPregistration/update_title_description?id=${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authToken': `${authToken}`,
      },
      body: JSON.stringify(FYP_registration),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(`${errorData.error}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setRegistrationData('FYP idea updated successfully:', data)
      })
      .catch((error) => {
        setError(`Error updating FYP idea. ${error.message}`)
      });
  };

  return (
    <div className='admin-registration-form' style={{marginTop:"200px",marginLeft:"170px"}}>
      <h2>FYP Updation Form</h2>
      <form>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <br />

        <label htmlFor="description">Desciption:</label>
        <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required></textarea>
        <br />
        
        <button type="button" onClick={FYPregister}>Register</button>
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
}

export default StudentFYPRegistrationUpdate
