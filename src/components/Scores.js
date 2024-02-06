import React, { useState, useEffect } from "react";

function Scores() {
  const [marksData, setMarksData] = useState([]); // Initialize marksData as an empty array
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
      setError(null); // Clear any previous error
    } catch (error) {
      console.error("Error fetching marks data:", error);
      setError("Failed to fetch marks data. Please try again later.");
    }
  };

  return (
    <div>
      <h2
        style={{
          marginTop: "20px",
          marginLeft: "200px",
          color: "black",
          fontSize: "2rem",
        }}
      >
        Score Board
      </h2>
      {error && <p>Error: {error}</p>}
      {!error && !!marksData.length ? (
        <ul>
          {marksData.map((group, index) => (
            <li
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "7px",
                marginBottom: "16px",
                marginTop: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p>Group ID: {group.groupId}</p>
              <p>Obtained Marks: {group.totalMarks} </p>
              <p>Total Marks: {totalWeightage}</p>
              <p>Percentage: {((group.totalMarks * 100) / totalWeightage).toFixed(2)}%</p>

            </li>
          ))}
        </ul>
      ) : (
        <p style={{
          marginTop: "20px",
          marginLeft: "200px",
          color: "black",
          fontSize: "1.5rem",
        }}>No records</p>
      )}
    </div>
  );
}

export default Scores;
