import React, { useState, useEffect } from 'react';

const AllFYP = () => {

    const [all_FYP, setall_FYP] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          let url = 'http://localhost:3001/all_FYP';
  
          const response = await fetch(url, {});
          const data = await response.json();
  
          if (response.status === 404) {
            // If no announcements found, set announcements state to empty array
            setall_FYP([]);
          } else {
            const data = await response.json();
            setall_FYP(data);
          }
  
        } catch (error) {
          console.error('Error fetching FYPs:', error);
        }
      };
  
      // Fetch data when the component mounts
      fetchData();
    }, []); // Empty dependency array ensures the effect runs only once
  
  return (
    <>
      <div>

      {all_FYP.length === 0 ? (
          <p style={{marginTop:"20px",marginLeft:"200px",color:"wheat",fontSize:"2rem"}}>No FYP Idea</p>
        ) : (

        all_FYP.map((FYP) => (
          <div key={FYP.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '7px', marginBottom: '16px', marginTop: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ margin: '0', color: 'black' }}><span style={{ fontSize: '12px', color: 'black' }}>ID: {FYP.id}-</span> {FYP.title}</h2>
            <p style={{ margin: '8px 0 8px 0', color: '#111' }}>{FYP.description}</p>
            <p style={{ margin: '8px 0 8px 0', color: '#333' }}><span style={{ color: '#222' }}>Semester: </span>  {FYP.semester}</p>
            <p style={{ margin: '8px 0 8px 0', color: '#333' }}><span style={{ color: '#222' }}>Year: </span>  {FYP.year}</p>
          </div>
        )))}
      </div>
    </>
  )
}

export default AllFYP
