import React, { useState, useEffect } from 'react';
import './Student.css';

const StudentViewAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [target, setTarget] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:3001/announcement/user?target=student`;

        if (target !== 'all') {
          url = `http://localhost:3001/announcement/user?target=${target}`;
        }

        // const authToken = localStorage.getItem('authToken');

        const response = await fetch(url, {
        //   headers: {
        //     authToken: `${authToken}`,
        //   },
        });

        const data = await response.json();

        if (response.status === 404) {
          // If no announcements found, set announcements state to empty array
          setAnnouncements([]);
        } else {
          const data = await response.json();
          setAnnouncements(data);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchData();
  }, [target]);

  return (
    <>
      <div className='announcementButton'>
        <button onClick={() => setTarget('student')} >Student</button>
        <button onClick={() => setTarget('both')} >Both</button>
      </div>

      <div>
      {announcements.length === 0 ? (
          <p style={{marginTop:"20px",color:"wheat",fontSize:"2rem"}}>No announcements</p>
        ) : (
        announcements.map((announcement) => (
          <div key={announcement.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '7px', marginBottom: '16px', marginTop: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ margin: '0', color: 'black' }}><span style={{ fontSize: '12px', color: 'black' }}>ID: {announcement.id}-</span> {announcement.title}</h2>
          <p style={{ margin: '8px 0 8px 0', color: '#333' }}>{announcement.content}</p>
          <p style={{ margin: '0', color: '#555' }}>Target: {announcement.target}</p>
      </div>
      
        )))}
      </div>
    </>
  );
};

export default StudentViewAnnouncements;
