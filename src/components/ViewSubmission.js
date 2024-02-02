import React, { useState, useEffect } from 'react';

function ViewSubmission() {
  const [submissions, setSubmissions] = useState([]);
  const [editingSubmissionId, setEditingSubmissionId] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedOpen, setUpdatedOpen] = useState('');
  const [updatedDueDate, setUpdatedDueDate] = useState('');
  const [updatedWeightage, setUpdatedWeightage] = useState('');
  const authToken = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');
  const fetchSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:3001/submission/viewall', {
        headers: {
          'authToken': authToken,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  useEffect(() => {
    
    if (authToken) {
      fetchSubmissions();
    }
  }, [authToken]);

  const handleEdit = (id) => {
    const submissionToEdit = submissions.find(submission => submission.id === id);
    setEditingSubmissionId(id);
    setUpdatedName(submissionToEdit.name);
    setUpdatedDueDate(submissionToEdit.dueDate);
    setUpdatedOpen(submissionToEdit.open ==='yes'? 'yes' : 'no');
    setUpdatedWeightage(submissionToEdit.weightage);
  };

  const handleCancelEdit = () => {
    setEditingSubmissionId(null);
    setUpdatedName('');
    setUpdatedOpen('');
    setUpdatedDueDate('');
    setUpdatedWeightage('');
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/submission/edit/${editingSubmissionId}`, {
        method: 'PUT',
        headers: {
          'authToken': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: updatedName, dueDate: updatedDueDate, open: updatedOpen==='yes' ? 'yes' : 'no',
        weightage: updatedWeightage })
      });

      if (!response.ok) {
        throw new Error('Failed to update submission');
      }

      // Refresh submission list
      setEditingSubmissionId(null);
      setUpdatedName('');
      setUpdatedOpen('');
      setUpdatedDueDate('');
      setUpdatedWeightage('');
      fetchSubmissions();
    } catch (error) {
      console.error('Error updating submission:', error);
    }
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  };



  return (
    <div>
      <h2>Submissions List</h2>
      <ul>
        {submissions.map(submission => (
          <li key={submission.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '7px', marginBottom: '16px', marginTop: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            {editingSubmissionId === submission.id ? (
              <div>
                <p style={{ margin: '0', color: 'black' }}>
                  <span style={{ fontSize: '12px', color: 'black' }}>ID: {submission.id}-</span> 
                  Name: <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                </p>

                <p style={{ margin: '8px 0 8px 0', color: '#333' }}>
                Open: <select value={updatedOpen} onChange={(e) => setUpdatedOpen(e.target.value)}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </p>
                <p style={{ margin: '8px 0 8px 0', color: '#333' }}>
                  Due Date: <input type="date" value={updatedDueDate} onChange={(e) => setUpdatedDueDate(e.target.value)} />
                </p>
                <p style={{ margin: '8px 0', color: '#333' }}>
                  Weightage: <input type="number" value={updatedWeightage} onChange={(e) => setUpdatedWeightage(e.target.value)} />
                </p>

                <button style={{backgroundColor:"green",width:'70px', borderRadius:"5px"}}onClick={handleSaveEdit}>Save</button>
                <button style={{backgroundColor:"wheat",width:'70px', borderRadius:"5px"}}onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <p style={{ margin: '0', color: 'black' }}><span style={{ fontSize: '12px', color: 'black' }}>ID: {submission.id}-</span> Name: {submission.name}</p>
                <p style={{ margin: '8px 0 8px 0', color: '#333' }}>Open: {submission.open ==='yes'? 'Yes' : 'No'}</p>
             <p style={{ margin: '8px 0 8px 0', color: '#333' }}>Due Date: {formatDate(submission.dueDate)}</p>
             <p style={{ margin: '8px 0', color: '#333' }}>
                  Weightage: {submission.weightage}
                </p>
                {userRole === "coordinator" ? (
                <button style={{backgroundColor:"wheat",width:'100px', borderRadius:"5px"}} onClick={() => handleEdit(submission.id)}>Edit</button>
                ) : (
                  null
                )}
                </div>
              
            )}
          </li>
        ))}
      </ul>
    </div>
    
  );
}

export default ViewSubmission;
