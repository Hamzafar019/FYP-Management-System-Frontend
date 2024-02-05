import React, { useState, useEffect } from 'react';

const StudentFYPWorkSubmission = () => {
  const [submissionIds, setSubmissionIds] = useState([]);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState('');
  const [file, setFile] = useState(null);
  const [groupId, setGroupId] = useState('');
  const [error, setError] = useState([]);
  const [worksubmit, setWorksubmit] = useState([]);

  useEffect(() => {
    // Fetch groupId and submissionIds from backend when component mounts
    setWorksubmit('')
    setError('')
    fetchGroupId();
    fetchSubmissionIds();
  }, []);

  const fetchGroupId = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:3001/FYPregistration/status', {
        headers: {
          authToken: `${authToken}`
        }
      });
      if (!response.ok) {
        // Handle non-2xx responses
        const errorData = await response.json();
        setError(`Error ${errorData.error}`);
        return;

      }
      const data = await response.json();
      setGroupId(data[0].id);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchSubmissionIds = async () => {
    try {
      const response = await fetch('http://localhost:3001/submission/view');
      const data = await response.json();
      const submissionIds = data.map(submission => submission.id);

    // Now set the submissionIds to your state variable or wherever you want to store it
    setSubmissionIds(submissionIds);
    } catch (error) {
        setError('Error fetching submissionIds:', error)
      console.error('Error fetching submissionIds:', error);
    }
  };

  const handleSubmit = async (event) => {
    setError('')
    setWorksubmit('')
    event.preventDefault();
    const formData  = new FormData();
    formData.append('submissionId', selectedSubmissionId);
    formData.append('groupId', groupId);
    formData.append('file', file);
    const confirmed = window.confirm("Are you sure you want to submit?");

    if (confirmed) {
    try {
      const response = await fetch('http://localhost:3001/groupsubmission', {
        method: 'POST',
        body: formData
      });
      const responseData = await response.json();
      console.log('Submission created:', responseData);
      setWorksubmit("Submission Done")
      // Reset form fields after successful submission
      setSelectedSubmissionId('');
      setFile(null);
    } catch (error) {
        setError('Error creating submission:', error);
      console.error('Error creating submission:', error);
    }
}
  };

  return (
    <div className='login-form'>
      <h2>Submit Your Work</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Submission ID:
          <select value={selectedSubmissionId} onChange={(e) => setSelectedSubmissionId(e.target.value)}>
            <option value="">Select Submission ID</option>
            {submissionIds.map((id) => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </label>
        <label>
            File:
            <input 
                type="file" 
                accept=".pptx,.pdf,.docx,.cpp,.py,.ipynb"
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        const selectedFileType = e.target.files[0].type;
                        if (selectedFileType !== '' && !selectedFileType.match(/^application\/(vnd.openxmlformats-officedocument.presentationml.presentation|pdf|vnd.openxmlformats-officedocument.wordprocessingml.document)$/) && !selectedFileType.match(/^text\/(x-c\+\+|x-python|plain)$/) && !selectedFileType.match(/^application\/octet-stream$/) && !selectedFileType.match(/^application\/json$/)) {
                            e.target.value = null; // Clear the file input
                            alert("Please select a file with supported format (pptx, pdf, docx, cpp, py, ipynb).");
                        } else {
                            setFile(e.target.files[0]);
                        }
                    } else {
                        // Handle the case where no file is selected (upload canceled)
                        // Optionally, you can display a message to the user or take any other appropriate action.
                    }
                }} 
            />
        </label>
        <button type="submit" disabled={!selectedSubmissionId || !file}
        style={{ cursor: (!selectedSubmissionId || !file ||!groupId) ? 'not-allowed' : 'pointer' }}>Submit</button>

        {worksubmit && (
          <div className="success-message">
            {/* Print other registration data as needed */}
            <pre>{JSON.stringify(worksubmit, null, 2)}</pre>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default StudentFYPWorkSubmission;

