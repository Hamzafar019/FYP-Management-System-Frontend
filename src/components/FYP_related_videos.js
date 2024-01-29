import React, { useState, useEffect } from 'react';

function FYP_related_videos() {
  const [videos, setVideos] = useState([]);

  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  useEffect(() => {

  
    fetch('http://localhost:3001/data/FYPrelatedData',{
        headers: {
            'authToken': `${authToken}` // Include authToken as a Bearer token in the Authorization header
          }
    }) // Assuming this is the endpoint to fetch video data from your backend
      .then(response => response.json())
      .then(data => {
        setVideos(data.videos); // Assuming your response data is an object with a "videos" property containing the array of videos
      })
      .catch(error => {
        console.error('Error fetching videos: ', error);
      });
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  };


  return (
    <div>
      <h1>Relevant Videos</h1>
      {videos.map(video => (
        <div key={video.id}  style={{border:"5px solid wheat", marginTop:"50px", padding:"10px",borderRadius:"5px" }}>
          <h1 style={{}}>Title: {video.title}
          </h1>
          <p>Uploaded at: {formatDate(video.createdAt)}</p>
          {video.videoLink ? (
            <div>
              <h3  style={{marginTop:"20px", marginBottom:"20px"}}>Video Links</h3>
              <a   href={video.videoLink} target="_blank" rel="noopener noreferrer">
            {video.videoLink}
          </a>
            </div>
          ) : (
            <div>
              <h3  style={{marginTop:"30px"}}>Videos</h3>
              <video width="560" height="315" controls style={{border:"4px solid black",padding:"0px"}}>
                <source src={`http://localhost:3001/data/videos?param1=${video.videoPath}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FYP_related_videos;

