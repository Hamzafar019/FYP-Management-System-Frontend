import React, { useState, useEffect } from 'react';
import '../CSS/FYP_ideas.css';

const IndustryProjectsView = () => {
  const [FYP_ideas, setFYP_ideas] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');


  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:3001/industryproject';

        const response = await fetch(url, {
          headers: {
          'authToken': `${authToken}`
          }
        });

        if (response.status === 404) {
          // If no announcements found, set announcements state to empty array
          setFYP_ideas([]);
        } else {
          const data = await response.json();
          setFYP_ideas(data);
        }
      } catch (error) {
        console.error('Error fetching FYP ideas:', error);
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <>
      <div>

      {FYP_ideas.length === 0 ? (
          <p style={{marginTop:"20px",marginLeft:"200px",color:"black",fontSize:"2rem"}}>No Industry Projects</p>
        ) : (
          <>
          <p style={{marginTop:"20px",marginLeft:"200px",color:"black",fontSize:"2rem"}}>Industry Projects</p>
      {FYP_ideas.map((FYP_idea) => (
          <div key={FYP_idea.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '7px', marginBottom: '16px', marginTop: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ margin: '0', color: 'black' }}><span style={{ fontSize: '12px', color: 'black' }}>ID: {FYP_idea.id}-</span> {FYP_idea.title}</h2>
            <p style={{ margin: '8px 0 8px 0', color: '#111' }}>{FYP_idea.description}</p>
            <p style={{ margin: '8px 0 8px 0', color: '#333' }}>Availability: {FYP_idea.availability}</p>
            <p style={{ margin: '8px 0 8px 0', color: '#333' }}>Company Name: {FYP_idea.companyname}</p>
            <p style={{ margin: '8px 0 8px 0', color: '#333' }}>Contact Person Email: {FYP_idea.email}</p>
          </div>
        ))}
        
        </>)}
      </div>
    </>
  );
}

export default IndustryProjectsView;

