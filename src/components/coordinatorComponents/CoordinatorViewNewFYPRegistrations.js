import React, { useState, useEffect } from "react";
import FYPWideView from "./FYPWideView"; // Import the new component

const CoordinatorViewNewFYPRegistrations = () => {
  const [new_registrations, setnew_registrations] = useState([]);
  const [new_registrations_check, setnew_registrations_check] = useState([]);
  const [selectedFYP, setSelectedFYP] = useState(null); // To store the FYP selected for detailed view
  const [updation, setUpdation] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  const fetchData = async () => {
    try {
      let url = "http://localhost:3001/FYPregistration/newregistrations";
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          authToken: `${authToken}`, // Use "Bearer" before the token
        },
      });
      const data = await response.json();

      console.log("Fetched data:", data);
      setnew_registrations(data);
      setnew_registrations_check(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    
    fetchData();
  }, [updation]);

  // Function to handle the view button click
  const handleViewClick = (FYP) => {
    setSelectedFYP(FYP);
    setnew_registrations([])
  };

  // Function to handle changes in the wide view (save/cancel)
  const handleWideViewChange = (action, viewedValue, approveValue, reasonValue, supervisor, id, title, description ,semester, year) => {
    // Implement logic based on the action (save/cancel)
    if (action === "save") {
      
      const url = `http://localhost:3001/FYPregistration/update?id=${id}`;
      
      const data   = {
        viewedValue: viewedValue, // replace with the actual value
        approveValue: approveValue, // replace with the actual value
        reasonValue: reasonValue, // replace with the actual value
        supervisor: supervisor, // replace with the actual value
      };
      if(approveValue==="yes"){
      const url2=`http://localhost:3001/all_FYP`;
      const data2={
      
          "title":title,
          "description":description,
          "semester":semester,
          "year":year
        
      }

      fetch(url2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authToken: `${authToken}`,
          // Add any other headers as needed (e.g., authentication token)
        },
        body: JSON.stringify(data2),
      })
        .then(response => response.json())
        .then(result => {
          // Handle the response as needed
        })
        .catch(error => {
          console.error('Error updating ALL FYPs record:', error);
          // Handle the error as needed
        });
      }
      else if(approveValue==="no"){
        const url2=`http://localhost:3001/all_FYP/rejected`;
        const data2={
        
            "title":title,
            "description":description,
            "reason":reasonValue
          
        }
  
        fetch(url2, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authToken: `${authToken}`,
            // Add any other headers as needed (e.g., authentication token)
          },
          body: JSON.stringify(data2),
        })
          .then(response => response.json())
          .then(result => {
            // Handle the response as needed
          })
          .catch(error => {
            console.error('Error updating ALL FYPs record:', error);
            // Handle the error as needed
          });


      }
      
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authToken: `${authToken}`,
          // Add any other headers as needed (e.g., authentication token)
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(result => {
          setUpdation('FYP Registration updated successfully!!!!', result);
          setTimeout(() => {
            setUpdation(null);
          }, 3000);
          // Handle the response as needed
        })
        .catch(error => {
          console.error('Error updating FYP Registration:', error);
          // Handle the error as needed
        });
      
    } else if (action === "cancel") {
      // Implement logic to cancel changes
    }
    fetchData();
    // Close the wide view after handling the changes
    setSelectedFYP(null);
  };

  return (
    <>
    
    {new_registrations_check.length > 0 ? (
      <>
      
     {!selectedFYP && <h2 style={{  padding: '7px', marginBottom: '16px', marginTop: '150px'}}>New Projects</h2>}
      {new_registrations.map((new_registration) => (
        
        <div key={new_registration.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '7px', marginBottom: '16px', marginTop: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          {/* Display FYP information */}
          <h2 style={{ margin: '0', color: 'black' }}><span style={{ fontSize: '12px', color: 'black' }}>ID: {new_registration.id}-</span>{new_registration.title}</h2>
          <p style={{ margin: '8px 0 8px 0', color: '#333' }}>{new_registration.description}</p>
          {/* Add View Button */}
          <button onClick={() => handleViewClick(new_registration)}>View</button>
        </div>
      ))}
      
    <p>{updation}</p>
      {selectedFYP && (
        <FYPWideView FYP={selectedFYP} onViewChange={handleWideViewChange} />
      )}
    </>
    )
    : (
      <>
      <p>{updation}</p>
      <p style={{marginTop:"20px",marginLeft:"200px",color:"black",fontSize:"2rem"}}>No New Project Registration</p>
      </>
  )}
    </>
  );
};

export default CoordinatorViewNewFYPRegistrations;










