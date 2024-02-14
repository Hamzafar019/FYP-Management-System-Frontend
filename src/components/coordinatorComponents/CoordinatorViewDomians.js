import React, { useState, useEffect } from 'react';

const CoordinatorViewDomains = () => {
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState('');

  // Fetch the list of domain titles on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/domain');
        const data = await response.json();
        setTitles(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (title) => {
    try {
      const response = await fetch(`http://localhost:3001/domain?title=${title}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

   

      setNewTitle('');
      setSelectedTitle('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>

{selectedTitle && (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new title"
          />
          <button onClick={() => handleUpdate(selectedTitle)}>Save</button>
        </div>
      )}
      <h2>Domain List</h2>
      {error && <p>Error: {error}</p>}
      {titles.length === 0 ? (
        <p>No domains available</p>
      ) : (
        <ul>
          {titles.map((title) => (
            <li key={title.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '7px', marginBottom: '16px', marginTop: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            
             <p style={{ margin: '0', color: 'black', marginLeft:"5px", marginBottom:"5px",fontSize:"1.5rem"}}>{title.domainname}{''}</p>
              <button  style={{backgroundColor:"wheat",width:'75px', borderRadius:"5px",height:"35px"}} onClick={() => setSelectedTitle(title.domainname)}>
                Update
              </button>
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
};

export default CoordinatorViewDomains;
