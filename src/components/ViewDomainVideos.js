import React, { useState, useEffect } from 'react';

function ViewDomainVideos() {
  const [videos, setVideos] = useState([]);
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');

  useEffect(() => {

    fetch('http://localhost:3001/domain')
    .then(response => response.json())
    .then(data => {
      setDomains(data || []);
    })
    .catch(error => {
      console.error('Error fetching domains: ', error);
    });

  }, []);

  useEffect(() => {
    // Fetch videos when selected domain changes
    if (selectedDomain) {
      fetch(`http://localhost:3001/domainvideos/FYPrelatedData?domainname=${selectedDomain}`, {
        headers: {
          'authToken': `${authToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setVideos(data.videos || []);
        })
        .catch(error => {
          console.error('Error fetching videos: ', error);
        });
    }
  }, [selectedDomain]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  };

  return (
    <div>
      <h1  style={{
          marginTop: "20px",
          marginLeft: "200px",
          color: "black",
          fontSize: "2rem",
        }}>Domain Related Videos</h1>

<select
        value={selectedDomain}
        onChange={(e) => setSelectedDomain(e.target.value)}
        style={{
          marginTop: "20px",
          marginLeft: "200px",
          marginBottom: "20px",
          fontSize: "1.2rem",
        }}
      >
        <option value="">Select Domain</option>
        {domains.map(domain => (
          <option key={domain.domainname} value={domain.domainname}>{domain.domainname}</option>
        ))}
      </select>
      {videos.length === 0 ? (
        <p style={{marginTop:"20px",
        marginLeft: "200px",
        color: "black",
        fontSize: "1.5rem",}}>No videos to show.</p>
      ) : (
        videos.map(video => (
          <div key={video.id} style={{ border: "5px solid wheat", marginTop: "50px", padding: "10px", borderRadius: "5px" }}>
            <h1>Title: {video.title}</h1>
            <p>Uploaded at: {formatDate(video.createdAt)}</p>
            {video.videoLink ? (
              <div>
                <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>Video Links</h3>
                <a href={video.videoLink} target="_blank" rel="noopener noreferrer">
                  {video.videoLink}
                </a>
              </div>
            ) : (
              <div>
                <h3 style={{ marginTop: "30px" }}>Videos</h3>
                <video width="560" height="315" controls style={{ border: "4px solid black", padding: "0px" }}>
                  <source src={`http://localhost:3001/data/videos?param1=${video.videoPath}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ViewDomainVideos;

