// components/SupervisorAddRelevantData.js



import React, { useState, useEffect } from "react";

const SupervisorAddRelevantData = () => {
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    groupId: "",
    title: "",
    videoFile: null,
    videoLink: "",
  });
  const [groupOptions, setGroupOptions] = useState([]);

  useEffect(() => {
    // Fetch group IDs when component mounts
    fetchGroupIds();
  }, []);

  const fetchGroupIds = async () => {

    try {
        let url = `http://localhost:3001/groups/mygroups`;


        const authToken = localStorage.getItem('authToken');

        const response = await fetch(url, {
          headers: {
            
            authToken: `${authToken}`,
          },
        });

        const data = await response.json();

        setGroupOptions(data);
      } catch (error) {
        setError('Error fetching groups:', error)
        console.error('Error fetching groups:', error);
      }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, videoFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('')
    setSuccess('')
    const formDataToSend = new FormData();
    formDataToSend.append("groupId", formData.groupId);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("videoFile", formData.videoFile);
    formDataToSend.append("videoLink", formData.videoLink);
    if (!formData.title || !formData.groupId) {
      setError("Please select a group ID and enter a title.");
      return;
    }
    if (!formData.videoFile && !formData.videoLink) {
      setError("Add either video or link to video.");
      return;
    }
    const authToken = localStorage.getItem('authToken');
    try {
        const response = await fetch("http://localhost:3001/data/FYPrelatedData", {
          method: "POST",
          body: formDataToSend,
          headers: {// Add Content-Type header
            "authToken":`${authToken}`
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
    
        // Handle success
        setSuccess("Form submitted successfully");
      setFormData({
        groupId: "",
        title: "",
        videoFile: null,
        videoLink: "",
      });

      } catch (error) {
        setError("Error submitting form:", error)
        // Handle error
      }
  };

  return (
    
    <div className="login-form" style={{ height: '350px' }}>
      <h1>FYP relevant data</h1>
    <form onSubmit={handleSubmit}>
      {/* Group ID dropdown */}
      <select name="groupId" value={formData.groupId} style={{ marginTop: '10px' }} onChange={handleInputChange}>
        <option value="">Select Group ID</option>
        {groupOptions.map((group) => (
          <option key={group.id} value={group.id}>
            {group.id}
          </option>
        ))}
      </select>
      {/* Title input */}
      <input type="text" name="title" value={formData.title}  style={{ marginTop: '10px' }} placeholder="Enter title" required onChange={handleInputChange} />
      {/* Video link input */}
      <input type="text" name="videoLink" placeholder="Enter link"  value={formData.videoLink} onChange={handleInputChange} />
      {/* Video upload input */}
      <input type="file" accept="video/mp4"   onChange={handleFileChange} />
      <button type="button" onClick={handleSubmit}>Submit</button>
      {success && (
          <div className="success-message">
            {/* Print other registration data as needed */}
            <pre>{JSON.stringify(success, null, 2)}</pre>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
    </form>
    </div>
  );
};

export default SupervisorAddRelevantData;
