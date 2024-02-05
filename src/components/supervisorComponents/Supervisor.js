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
import SupervisorViewWork from "./SupervisorViewWork";
import SupervisorCreateMeeting from "./SupervisorCreateMeeting";
import ViewSubmission from "../ViewSubmission";
import Scores from "../Scores";
import Rejected_FYP from "../Rejected_FYP";
import MeetingsDetails from "./MeetingsDetails";
import ChangePassword from "../ChangePassword";

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
            <Route exact path="/supervisor/viewwork" element={<SupervisorViewWork />} />
            <Route exact path="/supervisor/viewFYPsubmissions" element={<ViewSubmission />} />
            <Route exact path="/supervisor/scores" element={<Scores />} />
            <Route exact path="/supervisor/rejectedFYP" element={<Rejected_FYP />} />
            <Route exact path="/supervisor/createmeetings" element={<SupervisorCreateMeeting />} />
            <Route exact path="/supervisor/meetingsdetails" element={<MeetingsDetails />} />
            <Route exact path="/changepassword" element={<ChangePassword />} />
            

            
          </Routes>

        </div>
      </Router>
    </>
  );
};

export default Supervisor;
