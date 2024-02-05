import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
const CoordinatorReportGenerator = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [result, setResult] = useState(null);

  const containerRef = useRef(null);
  const downloadContent = () => {
    const container = document.getElementById("download-container");
    const opt = {
      margin: 1,
      filename: `${selectedEmail}_FYP_report.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(container).set(opt).save();
  };

  useEffect(() => {
    // Fetching students data from the server
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/FYP/students", {
          headers: {
            authToken,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Data:", data);
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchData();
  }, [authToken]); // Include authToken in the dependency array to re-fetch data when it changes

  const handleSearch = () => {
    const filtered = students.filter((student) =>
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const handleClick = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:3001/FYP/report?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken,
          },
        }
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error sending report:", error);
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container.scrollHeight - container.scrollTop ===
      container.clientHeight
    ) {
      // Load more data or implement pagination here
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <input
        type="text"
        placeholder="Search by email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "5px 10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
      <div
        ref={containerRef}
        style={{ marginTop: "20px", overflowY: "auto", maxHeight: "400px" }}
        onScroll={handleScroll}
      >
        {filteredStudents.slice(0, 10).map((student) => (
          <button
            key={student.email}
            onClick={() => handleClick(student.email)}
            style={{
              marginRight: "10px",
              marginBottom: "10px",
              padding: "5px 10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {student.name}
          </button>
        ))}
      </div>
      {result && (<>
        <div
          id="download-container"
          style={{
            marginTop: "20px",
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <h2
            style={{
              marginBottom: "23px",
              marginTop: "20px",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            Final Year Project Result
          </h2>
          <p
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            <b>FYP Student ID:</b> {result.registration.id}
          </p>
          <p
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              textAlign: "center",
            }}
            p
          >
            <b>FYP Title:</b> {result.registration.title}
          </p>
          <p
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            <b>FYP Description:</b>
            {result.registration.description}
          </p>
          <p
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            <b>FYP Student 1 Email:</b> {result.registration.student1}
          </p>
          <p
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            <b>FYP Student 2 Email:</b> {result.registration.student1}
          </p>
          <p
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            <b>FYP Student 3 Email:</b> {result.registration.student1}
          </p>
          <p
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            <b>FYP Supervisor:</b> {result.registration.supervisor}
          </p>
          <h3
            style={{
              marginBottom: "10px",
              marginTop: "50px",
              textAlign: "center",
            }}
          >
            Submission Details:
          </h3>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Name
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Weightage
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Marks
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Total Weighted Marks
                </th>
              </tr>
            </thead>
            <tbody>
              {result.submissionDetails.map((detail) => (
                <tr key={detail.id}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {detail.name}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {detail.weightage}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {detail.marks}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {detail.totalWeightedMarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p
            style={{
              marginBottom: "10px",
              marginTop: "45px",
              textAlign: "center",
            }}
          >
            <b>FYP Total Marks:</b> {result.totalMarks}
          </p>
          <p
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            <b>FYP Total Meetings:</b> {result.meetingsCounts}
          </p>
          <p
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            <b>FYP Meetings attended:</b> {result.attendanceCount}
          </p>
        </div>
        <button onClick={downloadContent}>Download PDF</button>
    
        </>
      )}
    </div>
  );
};

export default CoordinatorReportGenerator;
