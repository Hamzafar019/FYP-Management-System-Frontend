import React, { useState } from 'react';

function CoordinatorCreateSubmission() {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(null);

  const handleSubmit = async (e) => {
    setError('')
    setDone('')
    e.preventDefault();

    
    if (!name || !dueDate) {
        setError('Name or dueDate cannot be empty.');
      return;
    }
    try {
      const authToken = localStorage.getItem('authToken');

      const response = await fetch('http://localhost:3001/submission/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': authToken
        },
        body: JSON.stringify({ name, dueDate })
      });

      if (!response.ok) {
        throw new Error('Failed to create submission');
      }

      // Reset form fields after successful submission
      setDone("Submission Added")
      setName('');
      setDueDate('');
    } catch (error) {
        setError('Error creating submission:', error)
      console.error('Error creating submission:', error);
    }
  };

  return (
    <div className="login-form" style={{marginTop:"200px",height:"250px"}}>
    <form onSubmit={handleSubmit}>
      <div style={{marginTop:"15px"}}>
        <label htmlFor="name" >Name:</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input 
          type="date" 
          id="dueDate" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
          required
        />
      </div>
      <button type="submit">Submit</button>
      
      {done && (
          <div className="success-message">
            {/* Print other registration data as needed */}
            <pre>{JSON.stringify(done, null, 2)}</pre>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
    </form>
    </div>
  );
}

export default CoordinatorCreateSubmission;

