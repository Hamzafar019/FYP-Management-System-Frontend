import React, { useState, useEffect } from 'react';


const SupervisorMyGroups = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:3001/groups/mygroups`;


        const authToken = localStorage.getItem('authToken');

        const response = await fetch(url, {
          headers: {
            authToken: `${authToken}`,
          },
        });

        const data = await response.json();

        setRegistrations(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>

      <div>
      <h2
        style={{
          marginTop: "20px",
          marginLeft: "200px",
          color: "black",
          fontSize: "2rem",
        }}
      >
        My Groups
      </h2>
      {registrations.length === 0 ? (
  <p  style={{
    marginTop: "20px",
    marginLeft: "200px",
    color: "black",
    fontSize: "1.5rem",
  }}>No Groups under your submission</p>
) : (
        registrations.map((registration) => (
          <div key={registration.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '7px', marginBottom: '16px', marginTop: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ margin: '0', color: 'black' }}><span style={{ fontSize: '12px', color: 'black' }}>Group ID: {registration.id}-</span> Title: {registration.title}</h2>
          <p style={{ margin: '8px 0 8px 0', color: '#333' }}>Description: {registration.description}</p>
          <p style={{ margin: '8px 0 8px 0', color: '#333' }}>Student 1: {registration.student1}</p>
          <p style={{ margin: '8px 0 8px 0', color: '#333' }}>Student 2: {registration.student2}</p>
            {registration.student3 && <p style={{  margin: '8px 0 8px 0', color: '#333' }}>Student 3: {registration.student3}</p>}
      </div>
      
        )))}
      </div>
    </>
  );
};

export default SupervisorMyGroups;
