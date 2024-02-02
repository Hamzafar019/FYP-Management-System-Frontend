// CollapsibleNavbar.js
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Student.css';

const StudentNavSidebar = () => {
  const [showAdditionalItems, setShowAdditionalItems] = useState({
    Announcement: false,
    FYP_Suggestions_All_FYPS: false,
    FYP_Registrations: false,
    Group: false,
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
          <Link to="/student">Home</Link>
        </li>

        <li>
          <button onClick={() => toggleAdditionalItems('Announcement')}>
          Announcements
          </button>
          {showAdditionalItems.Announcement && (
            <ul className="additional-items">
              <Link to="/student/viewannouncements">- View Announcements</Link>
              {/* <Link to="/student">- All Annuncement</Link> */}
            </ul>
          )}
        </li>
        <li>
          <button onClick={() => toggleAdditionalItems('FYP_Suggestions')}>
          FYP Suggestions, All FYPs
          </button>
          {showAdditionalItems.FYP_Suggestions && (
            <ul className="additional-items">
            <Link to="/student/scores">- Scores</Link>
              <Link to="/student/viewFYPideas">- View FYP Suggestions</Link>
              <Link to="/student/viewallFYP">- View all FYPs</Link>
              <Link to="/student/rejectedFYP">- Rejected FYPs</Link>

              
              {/* <li>- Item B</li>
              <li>- Item C</li> */}
            </ul>
          )}
        </li> 
        <li>
          <button onClick={() => toggleAdditionalItems('FYP_Suggestions_All_FYPS')}>
          FYP Registrations
          </button>
          {showAdditionalItems.FYP_Suggestions_All_FYPS && (
            <ul className="additional-items">
              <Link to="/student/FYPregistrations">- FYP Registration</Link>  
              <Link to="/student/FYPstatus">- FYP Status</Link>  
            </ul>
          )}
        </li> 
        <li>
          <button onClick={() => toggleAdditionalItems('Group')}>
          Group
          </button>
          {showAdditionalItems.Group && (
            <ul className="additional-items">
            <Link to="/student/viewFYPsubmissions">- FYP Submissions</Link>  
              <Link to="/student/viewvideos">- View Videos</Link>  
              <Link to="/student/submitwork">- Submit Work</Link>  
              <Link to="/student/meetingsdetails">- Meetings Details</Link>  
            </ul>
          )}
        </li> 
        {/* <li>
          <button onClick={() => toggleAdditionalItems('ThirdItem')}>
          Third Item
          </button>
          {showAdditionalItems.ThirdItem && (
            <ul className="additional-items">
              <li>- Item X</li>
              <li>- Item Y</li>
              <li>- Item Z</li>
            </ul>
          )}
        </li> */}

      </ul>
    </nav>
    </div>
  );
};

export default StudentNavSidebar;
