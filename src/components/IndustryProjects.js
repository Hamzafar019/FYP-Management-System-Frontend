import React, { useState } from 'react';

const IndustryProjects = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [registrationData, setRegistrationData] = useState(null);

  const CompanyProjectPost = () => {
    setError('')
    setRegistrationData('')
    // Check if title and content are not empty
    if (!title || !description || !companyName || !email) {
        setError('Sorry!!! Title, description, company name \nand email is mandatory.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }


    const emailPattern = /^(?!.*@(?:gmail\.com|yahoo\.com|outlook\.com))(?!.*@.*(?:edu\b))[^@\s]+@[^@\s]+\.[^@\s]+$/i;


    if (!emailPattern.test(email)) {
    setError("Please use your company's/industry's email id");
    return;
    }
    let Industry_project={
        title,
        description,
        companyName,
        email
    }
    

    // Make a POST request to the backend
    fetch('http://localhost:3001/industryproject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Industry_project),
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
        setRegistrationData('Industry project posted successfully', data)
      })
      .catch((error) => {
        setError(`${error.message}`)
      });
  };

  return (
    <div className='admin-registration-form' style={{marginTop:"60px",marginLeft:"65px"}}>
      <h2>Industry Project Form</h2>
      <form>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <br />

        <label htmlFor="description">Desciption:</label>
        <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required></textarea>
        <br />

        <label htmlFor="companyName">Company Name:</label>
        <input type="text" id="companyName" name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        <br />
        
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        
        <button type="button" onClick={CompanyProjectPost}>Post Project</button>
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

export default IndustryProjects;


