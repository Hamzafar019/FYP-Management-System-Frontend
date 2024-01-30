import React from "react";
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
import CoordinatorViewSubmission from "./CoordinatorViewSubmission";
const Coordinator = () => {
  return (    
    <>
      <Router >
        <CoordinatorNavSidebar/>
        <div className="coordinator-content" style={{ marginTop: '110px' }}  >
          <Routes>
            <Route exact path="/coordinator/" element={<CoordinatorHome />} />
            <Route exact path="/coordinator/newannouncement" element={<CoordinatorNewAnnouncement />} />
            <Route exact path="/coordinator/viewannouncements" element={<CoordinatorViewAnnouncements />} />
            <Route exact path="/coordinator/viewFYPideas" element={<ViewFYPIdeas />} />
            <Route exact path="/coordinator/viewallFYP" element={<AllFYP />} />
            <Route exact path="/coordinator/newRegistrations" element={<CoordinatorViewNewFYPRegistrations />} />
            <Route exact path="/coordinator/newSubmission" element={<CoordinatorCreateSubmission />} />
            <Route exact path="/coordinator/viewSubmission" element={<CoordinatorViewSubmission />} />
            
            
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default Coordinator;
