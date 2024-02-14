import React, {useState}  from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Coordinator.css';
import CoordinatorHome from './CoordinatorHome';
import CoordinatorNavSidebar from "./CoordinatorNavSidebar";
import CoordinatorNewAnnouncement from "./CoordinatorNewAnnouncement";
import CoordinatorViewAnnouncements from "./CoordinatorViewAnnouncements";
import ViewFYPIdeas from "../ViewFYPIdeas";
import AllFYP from "../AllFYP";
import CoordinatorViewNewFYPRegistrations from "./CoordinatorViewNewFYPRegistrations";
import CoordinatorCreateSubmission from "./CoordinatorCreateSubmission";
import CoordinatorReportGenerator from "./CoordinatorReportGenerator";

import ViewSubmission from "../ViewSubmission";
import Scores from "../Scores";
import Rejected_FYP from "../Rejected_FYP";
import ChangePassword from "../ChangePassword";
import IndustryProjectsView from "../IndustryProjectsView";


import Navbar from "../Navbar";
import CoordinatorAllGroups from "./CoordinatorAllGroups";
import CoordinatorDomains from "./CoordinatorDomains";
import CoordinatorViewDomians from "./CoordinatorViewDomians";
const Coordinator = ({onSignOutClick}) => {
  
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  );
  return (    
    <>
      <Router >
      {userRole !== null && <Navbar onSignOutClick={onSignOutClick} />}
        <CoordinatorNavSidebar/>
        <div className="coordinator-content" style={{ marginTop: '110px' }}  >
          <Routes>
            <Route exact path="/coordinator/" element={<Scores />} />
            <Route exact path="/coordinator/newannouncement" element={<CoordinatorNewAnnouncement />} />
            <Route exact path="/coordinator/viewannouncements" element={<CoordinatorViewAnnouncements />} />
            <Route exact path="/coordinator/viewFYPideas" element={<ViewFYPIdeas />} />
            <Route exact path="/coordinator/viewallFYP" element={<AllFYP />} />
            <Route exact path="/coordinator/newRegistrations" element={<CoordinatorViewNewFYPRegistrations />} />
            <Route exact path="/coordinator/newSubmission" element={<CoordinatorCreateSubmission />} />
            <Route exact path="/coordinator/viewSubmission" element={<ViewSubmission />} />
            <Route exact path="/coordinator/guidelines" element={<CoordinatorHome />} />
            <Route exact path="/coordinator/rejectedFYP" element={<Rejected_FYP />} />
            <Route exact path="/coordinator/allgroups" element={<CoordinatorAllGroups />} />
            <Route exact path="/coordinator/report" element={<CoordinatorReportGenerator />} />
            <Route exact path="/changepassword" element={<ChangePassword />} />
            <Route exact path="/industryprojects" element={<IndustryProjectsView />} />
            <Route exact path="/coordinator/newDomain" element={<CoordinatorDomains />} />
            <Route exact path="/coordinator/viewDomain" element={<CoordinatorViewDomians />} />
            
            
            
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default Coordinator;
