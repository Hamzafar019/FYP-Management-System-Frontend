import React, { useState, useEffect } from 'react';

const StudentFYPstatus = () => {
  const [statusData, setStatusData] = useState(null);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');

  useEffect(() => {
    const fetchStatusData = async () => {

      try {
        const response = await fetch('http://localhost:3001/FYPregistration/status', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authToken': `${authToken}`,
            
          },
        });

        if (!response.ok) {
          // Handle non-2xx responses
          const errorData = await response.json();
          setError(`Error (${response.status}): ${errorData.error}`);
          return;

        }

        const data = await response.json();
        setStatusData(data);
      } catch (error) {
        setError(error.message);
      }
      
    };
    
    fetchStatusData();
  },[]); // Empty dependency array to ensure the effect runs once when the component mounts

  return (
    <div>
      {statusData ? (
        <div>
          <h2>FYP Registration Status</h2>
          
          {statusData.map((project) => (
            <div key={project.id}>
            <h3 style={{ marginTop: '35px' }}>Title: {project.title}</h3>
            <p style={{ marginTop: '25px' }}>Description: {project.description}</p>
            <p style={{ marginTop: '25px' }}>Student 1: {project.student1}</p>
            <p style={{ marginTop: '25px' }}>Student 2: {project.student2}</p>
            {project.student3 && <p style={{ marginTop: '25px' }}>Student 3: {project.student3}</p>}
            <p style={{ marginTop: '25px', color: project.viewed === "yes" ? (project.accepted === "yes" ? "green" : "red") : "yellow" }}>
    Status: {project.viewed === "yes" ? (project.accepted === "yes" ? "Accepted" : "Rejected") : "Pending"}
  </p>
            {project.supervisor && <p style={{ marginTop: '25px', color:"green" }}>Supervisor: {project.supervisor}</p>}
            {project.reason && <p style={{ marginTop: '25px', color:"red" }}>Reason/Remarks: {project.reason}</p>}
            


{project.viewed === "yes" && project.accepted === "no" && (
    <button style={{ marginTop: '25px',backgroundColor:"red", width:"120px",padding:"10px",color:"white",borderRadius:"9px",cursor:"pointer" }} onClick={() => window.location.href=`/student/FYPregistrationupdate/${project.id}`}>
      Update Title and Description
    </button>
  )}
          </div>
          
          ))}
        </div>
      ) : (
        <p>{error}</p>
        // <p>{error || 'Loading...'}</p>
      )}
    </div>
  );
};

export default StudentFYPstatus;
