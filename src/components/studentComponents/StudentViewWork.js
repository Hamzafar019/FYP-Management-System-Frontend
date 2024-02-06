import React, { useState, useEffect } from 'react';

const StudentViewWork = () => {
  const [submissionIds, setSubmissionIds] = useState([]);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [supervisorMarks, setSupervisorMarks] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [selectedMarks, setSelectedMarks] = useState('');
  
  const [error, setError] = useState(null); 
  const [files, setFiles] = useState([]);

  const downloadBlob = (blobData, fileName) => {
    const blobUrl = URL.createObjectURL(blobData);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };
  useEffect(() => {

    
    // Fetch submission IDs
    fetch('http://localhost:3001/submission/viewall')
      .then(response => response.json())
      .then(data => {
        
      const submissionIds = data.map(submission => submission.id);

      // Now set the submissionIds to your state variable or wherever you want to store it
      setSubmissionIds(submissionIds);
      })
      .catch(error => {
        console.error('Error fetching submission IDs:', error);
        setError('Error fetching submission IDs');
      });

    // Fetch group IDs
      // Fetch groups from the server
      fetch('http://localhost:3001/FYPregistration/status', {
        headers: {
          'authToken': `${localStorage.getItem('authToken')}`
        }
      })
      .then(response => response.json())
      .then(data => {
        // Check if data exists
        if (data && data.length > 0) {
            setSelectedGroupId(data[0].id); // Set group data
        } else {
            setSelectedGroupId([]); // Set empty array if no data
        }
      })
      .catch(error => console.error('Error fetching groups:', error));
  
  }, []);

  useEffect(() => {
    if (selectedSubmissionId && selectedGroupId) {
      fetch(`http://localhost:3001/groupsubmission/view?submissionId=${selectedSubmissionId}&groupId=${selectedGroupId}`
      , {
        headers: {
          authToken: `${localStorage.getItem('authToken')}`
        }
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(errorData => {
            
          setFiles([])
            throw new Error(`${errorData.error}`);
          });
        }
        return response.json();
      })
        .then(data => {
               
        
            setSupervisorMarks(data.supervisorMarks);
            setFiles(data.files);
            setError(null); // Clear error if fetching is successful
          
    })
        .catch(error => {
          setError(`${error.message}`)
        });
    }
  }, [selectedSubmissionId, selectedGroupId]);

  const handleSubmissionChange = event => {
    setSelectedSubmissionId(event.target.value);
  };


  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  
  function arrayBufferToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }
 


  const handleUpdateMarks = () => {
    if (!selectedMarks || selectedMarks < 1 || selectedMarks > 100) {
      alert('Please select marks between 1 and 100');
      return;
    }

    const confirmation = window.confirm(`Are you sure you want to update marks to ${selectedMarks}?`);
    if (confirmation) {
      
      fetch(`http://localhost:3001/groupsubmission/updatesupervisormarks?submissionId=${selectedSubmissionId}&groupId=${selectedGroupId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authToken: localStorage.getItem('authToken')
        }
        ,
        body:JSON.stringify({
          "supervisorMarks":selectedMarks
        })
      })
        .then(response => {
          if (response.ok) {
            setUpdateMessage('Marks updated successfully');
            setTimeout(() => {
              setUpdateMessage('');
            }, 3000);
          } else {
            setUpdateMessage('Failed to update marks');
          }
        })
        .catch(error => {
          console.error('Error updating marks:', error);
          setUpdateMessage('Failed to update marks');
          setTimeout(() => {
            setUpdateMessage('');
          }, 3000);
        });
    }
  };
  return (
    <div>
      {/* Submission ID dropdown */}
      <select value={selectedSubmissionId}  onChange={(e) => setSelectedSubmissionId(e.target.value)}>
        <option value="">Select Submission ID</option>
        {submissionIds.map(submissionId => (
          <option key={submissionId} value={submissionId}>
            {submissionId}
          </option>
        ))}
      </select>


      {selectedGroupId && selectedSubmissionId ? (
         <>
         {error ? (
           <p style={{ color: "red" }}>{error}</p>
         ) : (
           <>
             {supervisorMarks === null ? (
               <p style={{ color: "yellow" }}>Not graded</p>
             ) : (
               <p style={{ color: "yellowgreen" }}>Graded!!! Marks of Submission Id: {selectedSubmissionId}  Group Id: {selectedGroupId}: {supervisorMarks}</p>
             )}
             
        {updateMessage && <p style={{ color: updateMessage.includes('updated') ? 'green' : 'red' }}>{updateMessage}</p>}
           </>
         )}
       </>
     ) : (
        <p style={{marginTop:"10px", color:"black"}}>No submission id selected!!!</p>
      )}
      


 {files.map((file, index) => (
  <div key={index}>
    {/* Render files based on their extensions */}
    {file.fileExtension === 'pdf' ? (
      <div style={{ width: "100%", height: "100px",border:"2px solid wheat",marginTop:"20px",padding:"10px",borderRadius:"5px"}}>
      
        {/* <embed src={`data:application/pdf;base64,${arrayBufferToBase64(file.fileData.data)}`} type="application/pdf" style={{ width: "100%", height: "500px" }} /> */}
        
    <p style={{marginBottom:"20px"}}>{file.fileName}</p>
        <a href={`data:application/pdf;base64,${arrayBufferToBase64(file.fileData.data)}`} download={`Groupid:${selectedGroupId}_Submissionid:${selectedSubmissionId}_${file.fileName}`}>
          Download
        </a>
      </div>
    ) 
:(file.fileExtension === 'pptx' || file.fileExtension === 'docx') ? (
  <div style={{  width: "100%", height: "100px",border:"2px solid wheat",marginTop:"20px",padding:"10px",borderRadius:"5px"}}>
  {/* <iframe
  src={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${arrayBufferToBase64(file.fileData.data)}`}
  style={{ width: "100%", height: "500px", border: "2px solid red" }}
/> */}
<p style={{marginBottom:"20px"}}>{file.fileName}</p>
<a
  href={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${arrayBufferToBase64(file.fileData.data)}`}
  download={`Groupid:${selectedGroupId}_Submissionid:${selectedSubmissionId}_${file.fileName}`}
>
  Download
</a>
</div>
)

    : (file.fileExtension === 'cpp' || file.fileExtension === 'py') ? (
      <div style={{  width: "100%", height: "100px",border:"2px solid wheat",marginTop:"20px",padding:"10px",borderRadius:"5px"}} >
        {/* <pre>{arrayBufferToString(file.fileData.data)}</pre> */}
        
<p style={{marginBottom:"20px"}}>{file.fileName}</p>
        <a href={`data:text/plain;base64,${arrayBufferToBase64(file.fileData.data)}`} download={`Groupid:${selectedGroupId}_Submissionid:${selectedSubmissionId}_${file.fileName}`}>
          
          Download
        </a>
      </div>
    ) : (file.fileExtension === 'ipynb') ? (
      <div style={{ width: "100%", height: "100px",border:"2px solid wheat",marginTop:"20px",padding:"10px",borderRadius:"5px"}} >
        {/* <iframe src={`data:application/json;base64,${arrayBufferToBase64(file.fileData.data)}`} style={{ width: "100%", height: "500px", border:"2px solid red" }} /> */}
      
<p style={{marginBottom:"20px"}}>{file.fileName}</p>
        <a href={`data:application/json;base64,${arrayBufferToBase64(file.fileData.data)}`} download={`Groupid:${selectedGroupId}_Submissionid:${selectedSubmissionId}_${file.fileName}`}>
          Download
        </a>
      </div>
    ) 
    : (
      <a  style={{ width: "100%", height: "100px",border:"2px solid wheat",marginTop:"20px",padding:"10px",borderRadius:"5px"}}  href={`data:application/${file.fileExtension};base64,${arrayBufferToBase64(file.fileData.data)}`} download={`Groupid:${selectedGroupId}_Submissionid:${selectedSubmissionId}_${file.fileName}`}>
        <p  style={{marginBottom:"20px"}}>{file.Name}</p>
        Download
      </a>
    )
    }
  </div>
))}





    </div>
  );
};

export default StudentViewWork;
