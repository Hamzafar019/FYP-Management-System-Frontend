import React, { useState } from 'react';

const StudentFYPRegistration = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [student1, setStudent1] = useState('');
  const [student2, setStudent2] = useState('');
  const [student3, setStudent3] = useState('');
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
    if (!student1 || !student2) {
        setError('FYP group should have at least 2 members');
      return;
    }
    let FYP_registration={}
    if(!student3){
      FYP_registration = {
        title,
        description,
        student1,
        student2,
      };
    }
    else{
      FYP_registration = {
        title,
        description,
        student1,
        student2,
        student3
      };
    }
    

    // Make a POST request to the backend
    fetch('http://localhost:3001/FYPregistration', {
      method: 'POST',
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
        setRegistrationData('FYP idea posted successfully', data)
      })
      .catch((error) => {
        setError(`${error.message}`)
      });
  };

  return (
    <div className='admin-registration-form'>
      <h2>FYP Registration Form</h2>
      <form>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <br />

        <label htmlFor="description">Desciption:</label>
        <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required></textarea>
        <br />
        
        <label>Student 1:</label>
        <input type="email" value={student1} onChange={(e) => setStudent1(e.target.value)} />

        <label>Student 2:</label>
        <input type="email" value={student2} onChange={(e) => setStudent2(e.target.value)} />

        <label>Student 3:</label>
        <input type="email" value={student3} onChange={(e) => setStudent3(e.target.value)} />

        <button type="button" onClick={FYPregister}>Register</button>
        {registrationData && (
          <div className="success-message">
            {/* Print other registration data as needed */}
            <p>{registrationData}</p>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default StudentFYPRegistration;

