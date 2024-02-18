import React, { useState, useEffect } from "react";

function Scores() {
  const [marksData, setMarksData] = useState([]);
  const [error, setError] = useState(null);
  const [totalWeightage, setTotalWeightage] = useState(null);

  useEffect(() => {
    setError("");
    fetchMarksData();
    setTotalWeightage();
  }, []);

  const fetchMarksData = async () => {
    try {
      const response = await fetch("http://localhost:3001/submission/marks");
      if (!response.ok) {
        throw new Error("Failed to fetch marks data");
      }
      const data = await response.json();
      setMarksData(data.groupTotalsArray);
      setTotalWeightage(data.totalWeightage);
      setError(null);
    } catch (error) {
      console.error("Error fetching marks data:", error);
      setError("Failed to fetch marks data. Please try again later.");
    }
  };

  return (
    <div style={{marginTop: "180px",padding:"10px",borderRadius:"10px",border:"7px solid black",backgroundImage: 'linear-gradient(to bottom right, pink, white)'}}>
      <h2
        style={{
          marginTop: "20px",
          marginLeft: "250px",
          color: "black",
          fontSize: "2rem",
        }}
      >
        Score Board
      </h2>
      {error && <p>Error: {error}</p>}
      {!error && !!marksData.length ? (
        <ul>
          <li style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "7px",
                paddingTop:"20px",
                paddingBottom:"20px",
                backgroundColor:"black",
                marginBottom: "16px",
                marginTop: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gridColumnGap: "20px", width:"100%"}}>
  <p >Group ID </p>
  <p>Marks Obtained</p>
  <p>Total Marks</p>
  <p>Percentage %</p>
  <p></p>
</div>

          </li>
          {marksData.map((group, index) => (
            
            <li
                
         
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "7px",
                backgroundColor:"white",
                marginBottom: "16px",
                marginTop: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
                color:"black",
              }}
            >
               <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gridColumnGap: "20px", width:"100%"}}>
 

              
                  <p>{group.groupId}</p>
                  <p>{group.totalMarks}</p>
                  <p>{totalWeightage}</p>
                  <p>
                    
                    {((group.totalMarks * 100) / totalWeightage).toFixed(2)}%
                  </p>


                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor:
                        index === 0
                          ? "gold"
                          : index === 1
                          ? "silver"
                          : index === 2
                          ? "brown"
                          : "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                      right:"2px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {index === 0
                      ? "1st"
                      : index === 1
                      ? "2nd"
                      : index === 2
                      ? "3rd"
                      : "___"}
                      
                  </div>
                
                
                </div>
            </li>
          ))}
        </ul>
      ) : (
        <p
          style={{
            marginTop: "20px",
            marginLeft: "200px",
            color: "black",
            fontSize: "1.5rem",
          }}
        >
          No records
        </p>
      )}
    </div>
  );
}

export default Scores;
