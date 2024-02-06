// CollapsibleNavbar.js
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Coordinator.css';

const CoordinatorNavSidebar = () => {
  const [showAdditionalItems, setShowAdditionalItems] = useState({
    Announcement: false,
    FYP_Suggestions_All_FYPS: false,
    FYP: false,
  });

  const toggleAdditionalItems = (itemName) => {
    setShowAdditionalItems((prevItems) => ({
      ...prevItems,
      [itemName]: !prevItems[itemName]
    }));
  };
  
  return (
    <div id='navsidebar'>
    <nav>
      <ul style={{ marginTop: '80px' }}>
        <li>
          <Link to="/coordinator">Home</Link>
        </li>

        <li>
          <button onClick={() => toggleAdditionalItems('Announcement')}>
          Announcements
          </button>
          {showAdditionalItems.Announcement && (
            <ul className="additional-items">
              <Link to="/coordinator/newannouncement">- New Announcement</Link>
              <Link to="/coordinator/viewannouncements">- View Announcement</Link>
            </ul>
          )}
        </li>
         <li>
          <button onClick={() => toggleAdditionalItems('FYP_Suggestions_All_FYPS')}>
          FYP Suggestions, All FYPs
          </button>
          {showAdditionalItems.FYP_Suggestions_All_FYPS && (
            <ul className="additional-items">
              <Link to="/coordinator/scores">- Scores</Link>
              <Link to="/coordinator/viewFYPideas">- View FYP Suggestions</Link>
              <Link to="/coordinator/viewallFYP">- View all FYPs</Link>
              <Link to="/coordinator/rejectedFYP">- Rejected FYPs</Link>
              {/* <li>- Item B</li>
              <li>- Item C</li> */}
            </ul>
          )}
        </li> 
        
        <li>
          <button onClick={() => toggleAdditionalItems('FYP')}>
          FYP Submissions and Groups
          </button>
          {showAdditionalItems.FYP && (
            <ul className="additional-items">
              <Link to="/coordinator/newSubmission">- New Submission</Link>
              <Link to="/coordinator/viewSubmission">- View Submission</Link>
              <Link to="/coordinator/newRegistrations">- New Registrations</Link>
              <Link to="/coordinator/allgroups">- View All Groups</Link>
              <Link to="/coordinator/report">- Create Report</Link>
            </ul>
          )}
        </li>

      </ul>
    </nav>
    </div>
  );
};

export default CoordinatorNavSidebar;
