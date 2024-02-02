import React, { useState, useEffect } from 'react';

const Rejected_FYP = () => {
    const [rejected_projects, setRejected_projects] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'http://localhost:3001/all_FYP/rejected';
                const response = await fetch(url, {});
                const data = await response.json();
                setRejected_projects(data);
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
                {rejected_projects.length > 0 ? (
                    rejected_projects.map((FYP) => (
                        <div key={FYP.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '7px', marginBottom: '16px', marginTop: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <h2 style={{ margin: '0', color: 'black' }}><span style={{ fontSize: '12px', color: 'black' }}>ID: {FYP.id}-</span> {FYP.title}</h2>
                            <p style={{ margin: '8px 0 8px 0', color: '#111' }}>{FYP.description}</p>
                            <p style={{ margin: '8px 0 8px 0', color: '#333' }}><span style={{ color: '#222' }}>Reason: </span>  {FYP.reason}</p>
                        </div>
                    ))
                ) : (
                    <p style={{color:"wheat"}}>No rejected Final Year Projects till yet.</p>
                )}
            </div>
        </>
    );
};

export default Rejected_FYP;
