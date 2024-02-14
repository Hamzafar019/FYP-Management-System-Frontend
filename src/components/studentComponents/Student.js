import React, {useState}  from "react";
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
import StudentViewWork from "./StudentViewWork";
import FYP_related_videos from "../FYP_related_videos";
import StudentFYPWorkSubmission from "./StudentFYPWorkSubmission";
import ViewSubmission from "../ViewSubmission";
import Scores from "../Scores";
import Rejected_FYP from "../Rejected_FYP";
import StudentMeetingDetails from "./StudentMeetingDetails";
import ChangePassword from "../ChangePassword";
import IndustryProjectsView from "../IndustryProjectsView";
import Navbar from "../Navbar";

const Student = ({onSignOutClick}) => {
  
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  );
  return (    
    <>
      <Router >
            
      {userRole !== null && <Navbar onSignOutClick={onSignOutClick} />}
        <StudentNavSidebar/>
        <div className="student-content" style={{ marginTop: '110px' }}>
          <Routes>
            <Route exact path="/student/" element={<Scores />} />
            <Route exact path="/student/viewannouncements" element={<StudentViewAnnouncements />} />
            <Route exact path="/student/viewFYPideas" element={<ViewFYPIdeas />} />
            <Route exact path="/student/FYPregistrations" element={<StudentFYPRegistration />} />
            <Route exact path="/student/viewallFYP" element={<AllFYP />} />
            <Route exact path="/student/FYPstatus" element={<StudentFYPstatus />} />
            <Route path="/student/FYPregistrationupdate/:projectId" element={<StudentFYPRegistrationUpdate />} />
            <Route exact path="/student/viewvideos" element={<FYP_related_videos />} />
            <Route exact path="/student/submitwork" element={<StudentFYPWorkSubmission />} />
            <Route exact path="/student/viewFYPsubmissions" element={<ViewSubmission />} />
            <Route exact path="/student/guidelines" element={<StudentHome />} />
            <Route exact path="/student/rejectedFYP" element={<Rejected_FYP />} />
            <Route exact path="/student/meetingsdetails" element={<StudentMeetingDetails />} />
            <Route exact path="/student/viewwork" element={<StudentViewWork />} />
            <Route exact path="/changepassword" element={<ChangePassword />} />
            <Route exact path="/industryprojects" element={<IndustryProjectsView />} />

            

          </Routes>
        </div>
      </Router>
    </>
  );
};

export default Student;
