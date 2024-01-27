import React, { useState } from 'react';

const CoordinatorNewAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [target, setTarget] = useState('both');
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  const [error, setError] = useState('');
  const [registrationData, setRegistrationData] = useState(null);

  const submitAnnouncement = () => {
    setError('')
    setRegistrationData('')
    // Check if title and content are not empty
    if (!title || !content) {
        setError('Title or content cannot be empty.');
      return;
    }

    // Create announcement data
    const announcementData = {
      title,
      content,
      target,
    };

    // Make a POST request to the backend
    fetch('http://localhost:3001/announcement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': `${authToken}`,
      },
      body: JSON.stringify(announcementData),
    })
      .then((response) => {
        if (!response.ok) {
          
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRegistrationData('Announcement posted successfully:', data)
      })
      .catch((error) => {
        setError('Error posting announcement:')
      });
  };

  return (
    <div className='admin-registration-form'>
      <h2>Announcement Form</h2>
      <form>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <br />

        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} rows="4" required></textarea>
        <br />

        <label htmlFor="target">Target:</label>
        <select id="target" name="target" value={target} onChange={(e) => setTarget(e.target.value)}>
          <option value="student">Student</option>
          <option value="supervisor">Supervisor</option>
          <option value="both">Both</option>
        </select>
        <br />

        <button type="button" onClick={submitAnnouncement}>Submit</button>
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

export default CoordinatorNewAnnouncement;
