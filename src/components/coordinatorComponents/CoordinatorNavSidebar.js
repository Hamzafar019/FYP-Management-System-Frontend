// CollapsibleNavbar.js
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Coordinator.css';

const CoordinatorNavSidebar = () => {
  const [showAdditionalItems, setShowAdditionalItems] = useState({
    Announcement: false,
    FYP_Suggestions_All_FYPS: false,
    FYP_new_registrations: false,
    FYP_create_submission: false,
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
              <Link to="/coordinator/viewFYPideas">- View FYP Suggestions</Link>
              <Link to="/coordinator/viewallFYP">- View all FYPs</Link>
              {/* <li>- Item B</li>
              <li>- Item C</li> */}
            </ul>
          )}
        </li> 
        <li>
          <button onClick={() => toggleAdditionalItems('FYP_new_registrations')}>
          FYP New Registrations
          </button>
          {showAdditionalItems.FYP_new_registrations && (
            <ul className="additional-items">
              <Link to="/coordinator/newRegistrations">- New Registrations</Link>
            </ul>
          )}
        </li> 
        <li>
          <button onClick={() => toggleAdditionalItems('FYP_create_submission')}>
          FYP Submission
          </button>
          {showAdditionalItems.FYP_create_submission && (
            <ul className="additional-items">
              <Link to="/coordinator/newSubmission">- New Submission</Link>
              <Link to="/coordinator/viewSubmission">- View Submission</Link>
            </ul>
          )}
        </li>

      </ul>
    </nav>
    </div>
  );
};

export default CoordinatorNavSidebar;
