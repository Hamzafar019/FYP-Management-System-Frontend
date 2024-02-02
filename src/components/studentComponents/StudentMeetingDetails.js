import React, { useState, useEffect } from 'react';

function StudentMeetingDetails() {
  const [group, setGroup] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Fetch groups from the server
    fetch('http://localhost:3001/FYPregistration/status', {
      headers: {
        'authToken': `${localStorage.getItem('authToken')}`
      }
    })
    .then(response => response.json())
    .then(data => setGroup(data[0])) 
    .catch(error => console.error('Error fetching groups:', error));

    // Fetch meetings from the server
    fetch('http://localhost:3001/meetings/mymeetings', {
      headers: {
        'authToken': `${localStorage.getItem('authToken')}`
      }
    })
    .then(response => response.json())
    .then(data => setMeetings(data))
    .catch(error => console.error('Error fetching meetings:', error));

   
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleEdit = (meetingId, field, newValue) => {
    const updatedMeetings = meetings.map(meeting => {
      if (meeting.id === meetingId) {
        return { ...meeting, [field]: newValue };
      }
      return meeting;
    });
    setMeetings(updatedMeetings);
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate().toString().padStart(2, '0');
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const year = dateTime.getFullYear().toString();
    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${year}-${month}-${day}T${time}`;
  };

  const handleEditSubmit = (meetingId) => {
    const confirmation = window.confirm("Are you sure you want to update?");
    if (confirmation) {
      const meetingToUpdate = meetings.find(meeting => meeting.id === meetingId);
      const { id,groupId, dateTime, student1, student2, student3, done, meetingMinutes, createdAt,updatedAt } = meetingToUpdate;

      fetch(`http://localhost:3001/meetings/update?meetingId=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authToken': `${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({dateTime, student1, student2, student3, done, meetingMinutes})
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update meeting.');
        }
        // Handle successful update
      })
      .catch(error => {
        console.error('Error updating meeting:', error);
        // Handle error
      });
    }
  };

  const filteredMeetings = meetings.filter(meeting => {
    return (!selectedOption || meeting.done === selectedOption);
  });

  return (
    <div>
      <h1>Meeting List</h1>
      <h2 style={{marginTop:"7px",marginBottom:"10px"}}>Group id: {group.id}</h2>
      <div>
        <label htmlFor="option">Meeting Status:</label>
        <select id="option" onChange={handleOptionChange}>
          <option value="">All</option>
          <option value="missed">Missed</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <ul>
        {filteredMeetings.map(meeting => (
          <li key={meeting.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '7px', marginBottom: '16px', marginTop: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <p style={{ fontSize: '16px', color: 'black' }}>Date Time: {formatDateTime(meeting.dateTime)}</p>
            <p style={{ fontSize: '16px', color: 'black' }}>Meeting Done: {meeting.done}</p>
           

            {meeting.done === "yes"  && (
              <>
                <p style={{ fontSize: '16px', color: 'black' }}>{group.student1}: {meeting.student1} </p>
                <p style={{ fontSize: '16px', color: 'black' }}>{group.student2}: {meeting.student2}</p>
                {selectedDetails.student3 && (
                  <p style={{ fontSize: '16px', color: 'black' }}>{group.student3}: {meeting.student3}</p>
                )}
                <p style={{ fontSize: '16px', color: 'black' }}>Meeting Minutes:     
                  <textarea
                    rows="4"
                    cols="50"
                    value={meeting.meetingMinutes}
                    onChange={(e) => handleEdit(meeting.id, 'meetingMinutes', e.target.value)}
                  />
                </p>
                
              <button style={{width:"50px",height:"25px",fontSize:"10px",marginTop:"7px",marginBottom:"5px",paddingBottom:"20px"}} onClick={() => handleEditSubmit(meeting.id)}>Edit</button>
    
              </>
            )}
      </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentMeetingDetails;

