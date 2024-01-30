import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Student.css';
import StudentHome from './StudentHome';
import StudentNavSidebar from "./StudentNavSidebar";
import StudentViewAnnouncements from "./StudentViewAnnouncements";
import ViewFYPIdeas from "../ViewFYPIdeas";
import StudentFYPRegistration from "./StudentFYPRegistration";
import StudentFYPRegistrationUpdate from "./StudentFYPRegistrationUpdate";
import AllFYP from "../AllFYP";
import StudentFYPstatus from "./StudentFYPstatus";
import FYP_related_videos from "../FYP_related_videos";
import StudentFYPWorkSubmission from "./StudentFYPWorkSubmission";

const Student = () => {
  return (    
    <>
      <Router >
        <StudentNavSidebar/>
        <div className="student-content" style={{ marginTop: '110px' }}>
          <Routes>
            <Route exact path="/student/" element={<StudentHome />} />
            <Route exact path="/student/viewannouncements" element={<StudentViewAnnouncements />} />
            <Route exact path="/student/viewFYPideas" element={<ViewFYPIdeas />} />
            <Route exact path="/student/FYPregistrations" element={<StudentFYPRegistration />} />
            <Route exact path="/student/viewallFYP" element={<AllFYP />} />
            <Route exact path="/student/FYPstatus" element={<StudentFYPstatus />} />
            <Route path="/student/FYPregistrationupdate/:projectId" element={<StudentFYPRegistrationUpdate />} />
            <Route exact path="/student/viewvideos" element={<FYP_related_videos />} />
            <Route exact path="/student/submitwork" element={<StudentFYPWorkSubmission />} />

            

          </Routes>
        </div>
      </Router>
    </>
  );
};

export default Student;
