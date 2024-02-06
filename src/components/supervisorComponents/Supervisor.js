import React, {useState,useEffect} from "react";
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
import Navbar from "../Navbar";

import io from 'socket.io-client';
const Supervisor = ({onSignOutClick}) => {
  const [message, setMessage] = useState('s');


    const [userRole, setUserRole] = useState(
      localStorage.getItem("userRole") || null
    );
    useEffect(() => {
      // Connect to the Socket.IO server
      const socket = io('http://localhost:3001'); // Adjust the server URL and port

    setMessage("Q")
      socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });


      // Listen for 'chat message' events from the server
      socket.on('bothannouncement', (msg) => {
          // Update the messages state with the received message
          setMessage( msg);
      });

      // Clean up the socket connection on component unmount
      return () => {
          socket.disconnect();
      };
  }, []); 


  return (
    <>
      <Router>
        
      {userRole !== null && <Navbar onSignOutClick={onSignOutClick} />}
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
