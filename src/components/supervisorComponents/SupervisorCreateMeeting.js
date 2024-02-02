import React, { useState,useEffect } from 'react';

const SupervisorCreateMeeting = () => {
  const [groupId, setGroupId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [groupOptions, setGroupOptions] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await fetch('http://localhost:3001/groups/mygroups',{
            headers: {
              authToken: localStorage.getItem('authToken'),
            },
          });
        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }
        const data = await response.json();
        setGroupOptions(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
        setError('Failed to fetch groups');
      }
    }
    fetchGroups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const confirmed = window.confirm('Are you sure you want to create the meeting?');
    
    if (!confirmed) {
      return; // If not confirmed, exit the function
    }
    
    const datePart = date.split(' ')[0];
    let dateTime = `${datePart} ${time}`; 
    try {
      const response = await fetch(`http://localhost:3001/meetings/create?groupId=${groupId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('authToken')
        },
        body: JSON.stringify({ dateTime, time })
      });
  
      if (!response.ok) {
        throw new Error('An error occurred while creating the meeting.');
      }
  
      setMessage('Meeting created successfully!');
      setGroupId('');
      setDate('');
      setTime('');
    } catch (error) {
      setError(error.message);
      console.error('Error creating meeting:', error);
    }
  };
  

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    if (selectedDate >= today) {
      setDate(selectedDate);
      setError('');
      setMessage('')
    } else {
      setError('Please select a date from today onwards.');
    }
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    setError('');
    setMessage('')
  };

  const handleGroupIdChange = (e) => {
    setGroupId(e.target.value);
    setError('');
    setMessage('')
  };

  // Enable or disable the submit button based on form validation
  React.useEffect(() => {
    setSubmitDisabled(!groupId || !date || !time || !!error);
  }, [groupId, date, time, error]);

  return (
    <div className='login-form'>
      <h2>Create Meeting</h2>
      {error && <p style={{color:"red"}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
        Group ID:
          <select value={groupId} onChange={handleGroupIdChange}>
            <option value="">Select Group</option>
            {groupOptions.map(group => (
              <option key={group.id} value={group.id}>{group.id}</option>
            ))}
          </select>
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={handleDateChange} min={new Date().toISOString().split('T')[0]} />
        </label>
        <label>
          Time:
          <input type="time" value={time} onChange={handleTimeChange} />
        </label>
        <button type="submit" disabled={submitDisabled }  style={{ cursor: (submitDisabled) ? 'not-allowed' : 'pointer' }}>Create Meeting</button>
        {message && (
          <div className="success-message">
            <p>{message}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SupervisorCreateMeeting;
