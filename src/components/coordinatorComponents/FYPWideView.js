import React, { useState, useEffect } from "react";

const FYPWideView = ({ FYP, onViewChange }) => {
  const [viewed, setViewed] = useState("no");
  const [approve, setApprove] = useState("no");
  const [supervisors, setSupervisors] = useState([]);
  const [supervisor, setSupervisor] = useState(null);
  const [reason, setReason] = useState(null);
  const [semester, setSemester] = useState(null);
  const [year, setYear] = useState(null);
  const [id, setid] = useState(FYP.id);
  const [title, settitle] = useState(FYP.title);
  const [description, setdesciption] = useState(FYP.description);

  const handleViewedChange = (event) => {
    setViewed(event.target.value);
  };

  const handleApproveChange = (event) => {
    setApprove(event.target.value);
  };

  const handleSupervisorChange = (event) => {
    setSupervisor(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(parseInt(event.target.value));
  };
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };
  useEffect(() => {
    // Fetch data from http://localhost:3001/user/getsupervisors
    fetch("http://localhost:3001/user/getsupervisors")
      .then((response) => response.json())
      .then((data) => {
        // Extract supervisor names from the response
        const supervisorNames = Object.keys(data.filteredEmailCounts);
        setSupervisors(supervisorNames);
      })
      .catch((error) => console.error("Error fetching supervisors:", error));
  }, []);

  // Determine whether to disable Save and Cancel buttons based on "viewed" value
  const isSaveDisabled = viewed === "no";
  const isCancelDisabled = viewed === "yes";
  const currentYear = new Date().getFullYear();
  const previousYears = Array.from({ length: 10 }, (_, index) => currentYear - index);
  

  return (
    <div className="login-form"  style={{ marginTop: '200px', display:'flex',flexDirection:'column', height:"400px"}}>
      {/* Display FYP details */}
      <h2>{FYP.title}</h2>
      <p>{FYP.description}</p>

      {/* Select Viewed */}
      <label>
        Viewed:
        <select value={viewed} onChange={handleViewedChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      {/* Select Approve */}
      <label>
        Approve:
        <select value={approve} onChange={handleApproveChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      {/* Display Supervisor name options if viewed is yes and approve is yes */}
      {viewed === "yes" && approve === "yes" && (
        <>
        <label>
          Supervisor:
          <select value={supervisor} onChange={handleSupervisorChange}>
            <option value="">Select a Supervisor</option>
            {supervisors.map((supervisorName, index) => (
              <option key={index} value={supervisorName}>
                {supervisorName}
              </option>
            ))}
          </select>
        </label>
        

         {/* Select Semester */}
    <label>
      Semester:
      <select value={semester} onChange={handleSemesterChange}>
        <option value="">Select a Semester</option>
        <option value="Fall">Fall</option>
        <option value="Spring">Spring</option>
      </select>
    </label>
    


    {/* Enter Year */}
    <label>
        Year:
        <select value={year} onChange={handleYearChange}>
          <option value="">Select a Year</option>
          {previousYears.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>

        </>



        
      )}

      {/* Display Reason text area if approve is no */}
      {approve === "no" && viewed === "yes" && (
        <label>
          Reason:
          <textarea value={reason} onChange={handleReasonChange}></textarea>
        </label>
      )}

      {/* Add buttons for actions */}
      <button onClick={() => onViewChange("save", viewed, approve, reason, supervisor, id, title, description, semester, year)} disabled={isSaveDisabled} 
      style={{width:'200px',marginTop:"14px", display: viewed === "yes" ? "inline-block":"none" }}>
        Save
      </button>
      <button
        onClick={() => onViewChange("cancel")}
        // disabled={isCancelDisabled}
        style={{width:'200px',marginTop:"14px"}}
      >
        Cancel
      </button>
    </div>
  );
};

export default FYPWideView;
