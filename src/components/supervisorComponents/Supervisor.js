import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Supervisor.css';
import SupervisorNavSidebar from "./SupervisorNavSidebar";
import SupervisorHome from './SupervisorHome';
import SupervisorViewAnnouncements from "./SupervisorViewAnnouncements";
import ViewFYPIdeas from "../ViewFYPIdeas";
import AllFYP from "../AllFYP";
import SupervisorFYPNewIdea from "./SupervisorFYPNewIdea";
import SupervisorMyGroups from "./SupervisorMyGroups";
import SupervisorAddRelevantData from "./SupervisorAddRelevantData";
import FYP_related_videos from "../FYP_related_videos";

const Supervisor = () => {
  return (
    <>
      <Router>
        <SupervisorNavSidebar/>
        <div className="supervisor-content" style={{ marginTop: '110px' }}>
          <Routes>
            <Route exact path='/supervisor/'element={<SupervisorHome/>}/>
            <Route exact path="/supervisor/viewannouncements" element={<SupervisorViewAnnouncements />} />
            <Route exact path="/supervisor/addFYPideas" element={<SupervisorFYPNewIdea/>} />
            <Route exact path="/supervisor/viewallFYP" element={<AllFYP />} />
            <Route exact path="/supervisor/viewFYPideas" element={<ViewFYPIdeas />} />
            <Route exact path="/supervisor/mygroups" element={<SupervisorMyGroups />} />
            <Route exact path="/supervisor/addvideos" element={<SupervisorAddRelevantData />} />
            <Route exact path="/supervisor/viewvideos" element={<FYP_related_videos />} />
          </Routes>

        </div>
      </Router>
    </>
  );
};

export default Supervisor;
