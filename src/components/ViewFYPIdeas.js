import React, { useState, useEffect } from 'react';
import '../CSS/FYP_ideas.css';

const ViewFYPIdeas = () => {
  const [FYP_ideas, setFYP_ideas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:3001/FYP_idea';

        const response = await fetch(url, {});
        const data = await response.json();

        setFYP_ideas(data);
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
        {FYP_ideas.map((FYP_idea) => (
          <div key={FYP_idea.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '7px', marginBottom: '16px', marginTop: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ margin: '0', color: 'black' }}><span style={{ fontSize: '12px', color: 'black' }}>ID: {FYP_idea.id}-</span> {FYP_idea.title}</h2>
            <p style={{ margin: '8px 0 8px 0', color: '#111' }}>{FYP_idea.description}</p>
            <p style={{ margin: '8px 0 8px 0', color: '#333' }}>Availability: {FYP_idea.availability}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewFYPIdeas;
